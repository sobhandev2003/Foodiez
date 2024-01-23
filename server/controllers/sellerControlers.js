const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/sellerModel');
const { validateEmail, validatePhoneNumber, validatePassword, validateImgType } = require('../validator');
const Category = require('../models/categoryModel');

//NOTE - for register a saller
// Router.post('/register',)

const registerSeller = asyncHandler(async (req, res) => {

  const { restaurantName, ownerName, emil, mobile, special_food, password } = req.body;
  const { buffer, mimetype, size } = req.file
  // console.log(restaurantName);
  //NOTE - check inputs are valid or not
  if (!restaurantName || !ownerName || !emil || !mobile || !password || !special_food || !buffer || !mimetype) {
    res.status(403)
    throw new Error("input format is not valid")
  }


  if (restaurantName.length < 4 || ownerName.length < 4 || special_food.length < 3 || !validateEmail(emil) || !validatePhoneNumber(mobile) || !validatePassword(password)) {
    res.status(403)
    throw new Error("input format is not valid")
  }

  if (!validateImgType(mimetype)) {
    res.status(403)
    throw new Error("Except only jpeg or png type image");
  }


  if (size > (2 * 1024 * 1024)) {
    res.status(403)
    throw new Error("photo must be less than 2mb")
  }

  //
  // SECTION - create a new seller
  //NOTE - convert buffer to base64

  const bufferData = Buffer.from(buffer, 'binary');
  const imgString = bufferData.toString('base64');
  // console.log(base64String);

  //NOTE - add salt with password and hash
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const hashPassword = await bcrypt.hash(passwordWithSalt, 10)

  try {
    const seller = await Seller.create(
      {
        restaurantName, ownerName, emil, mobile, special_food,
        img: imgString, imgType: mimetype, password: hashPassword

      }
    )

    res.status(200).json(seller)
  } catch (error) {
    res.status(403).json(error)
  }

})

//SECTION -  for Login a saller
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
        expiresIn: "10d"
      }
    )
    res.status(200).json(jsonToken)
  }
  else {

    res.status(403);
    throw new Error("Emil and password not valid");
  }

})

//NOTE -  - for resturent photo  saller account
// Router.get('/updateimage',)

const updateImage = asyncHandler(async (req, res) => {
  const { buffer, mimetype, size } = req.file;
  const { id } = req.seller;
  //SECTION - check seller authorizetion and find seller
  if (!id) {
    res.status(401);
    throw new Error("seller not authorized")
  }

  const seller = await Seller.findById(id);

  if (!seller) {
    res.status(404);
    throw new Error("seller not found")
  }
  //SECTION -  - check all inputs are valid or not
  if (!buffer || !mimetype || !size) {
    res.status(403);
    throw new Error("input not valid");

  }
  if (!validateImgType(mimetype)) {
    res.status(403)
    throw new Error("Except only jpeg or png type image");
  }

  if (size > (2 * 1024 * 1024)) {
    res.status(403)
    throw new Error("photo must be less than 2mb")
  }

  //SECTION - convet buffer to base^4String and save it
  const bufferData = Buffer.from(buffer, 'binary');
  const imgString = bufferData.toString('base64');
  seller.img = imgString;
  seller.imgType = mimetype;
  await seller.save();
  res.status(200).json({ msg: "image update successfully" })


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
const getAllSeller = asyncHandler(async (req, res) => {
  const data = await Seller.find();
  const sellers = data.map((d) => {
    const seller = {
      restaurantName: d.restaurantName,
      special_food: d.special_food,
      rating:d.rating,
      img: d.img,
      imgType: d.imgType

    }
    return seller;
  })
  // console.log(sellers);
  res.status(200).json(sellers);
})


module.exports = { registerSeller, loginSeller, updateImage, forgotpassword, currentSeller, deletetSeller, getAllSeller }