const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/sellerModel');
const { validateEmail, validatePhoneNumber, validatePassword } = require('../validator');
const Category = require('../models/categoryModel');

//NOTE - for register a saller
// Router.post('/register',)

const registerSeller = asyncHandler(async (req, res) => {
  const { restaurantName, ownerName, emil, mobile, password } = req.body;
  const { buffer, mimetype, size } = req.file
  //NOTE - check inputs are valid or not
  if (!restaurantName || !ownerName || !emil || !mobile || !password || !buffer || !mimetype) {
    res.status(403)
    throw new Error("input format is not valid")
  }


  if (restaurantName.length < 4 || ownerName.length < 4 || !validateEmail(emil) || !validatePhoneNumber(mobile) || !validatePassword(password)) {
    res.status(403)
    throw new Error("input format is not valid")
  }
  if (size > (2 * 1024 * 1024)) {
    res.status(403)
    throw new Error("photo must be less than 2mb")
  }

  //
  // SECTION - create a new seller
  //NOTE - add salt with password and hash
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const hashPassword = await bcrypt.hash(passwordWithSalt, 10)

  try {
    const seller = await Seller.create(
      { 
        restaurantName, ownerName, emil, mobile,
         img: buffer, imgType: mimetype, password: hashPassword 
           
        }
    )

    res.status(200).json(seller)
  } catch (error) {
    res.status(403).json(error)
  }

})
//SECTION - 



//NOTE - for Login a saller
// Router.post('/login',)
const loginSeller = asyncHandler(async (req, res) => {
  const { emil, password } = req.body;
  if (!emil || !password) {
    res.status(403);
    throw new Error("Emil and password not valid");
  }
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const seller = await Seller.findOne({ emil });

  if (seller && (await bcrypt.compare(passwordWithSalt, seller.password))) {

    const jsonToken = jwt.sign(
      {
        seller: {
          ownerName: seller.ownerName,
          restaurantName: seller.restaurantName,
          emil: seller.emil,
          id: seller.id
        }
      },
      process.env.ACCESS_TOKE_SECRET
      ,
      {
        expiresIn: "20m"
      }
    )
    res.status(200).json(jsonToken)
  }
  else {

    res.status(403);
    throw new Error("Emil and password not valid");
  }

})

//NOTE - for forgot password  saller account
// Router.get('/forgotpassword',)
const forgotpassword = asyncHandler(async (req, res) => {
  const { emil, password } = req.body;
  if (!emil || !password) {
    res.status(403);
    throw new Error("Emil and password not valid");
  }
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const seller = await Seller.findOne({ emil });
  if (!seller) {
    res.status(403);
    throw new Error("Emil and password not valid");
  }
  // console.log(seller);
  const hashPassword = await bcrypt.hash(passwordWithSalt, 10)
  seller.password = hashPassword;
  await seller.save();
  res.status(200).json("password updated")
}
)


//NOTE - for current  saller details
// Router.get('/current',)
const currentSeller = asyncHandler(async (req, res) => {
  res.status(200).json(req.seller)
})


//NOTE - for delete  saller account
// Router.get('/delete',)
const deletetSeller = asyncHandler(async (req, res) => {
  const { id } = req.seller;
  if (!id) {
    res.status(401);
    throw new Error("seller not authorized")
  }
  const seller = await Seller.findById(id);
  if (!seller) {
    res.status(404);
    throw new Error("seller not found")
  }
  await Category.deleteMany({ seller_Id: id })
  await Seller.deleteOne({ _id: id });

  res.status(200).json("deleted")
})


//NOTE - Get all seller account
const getAllSeller=asyncHandler(async(req,res)=>{
  const seller = await Seller.find();
  res.status(200).json(seller);
})


module.exports = { registerSeller, loginSeller, forgotpassword, currentSeller, deletetSeller,getAllSeller }