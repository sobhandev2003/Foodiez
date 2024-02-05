const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyerModel');
const { validateEmail, validatePhoneNumber, validatePassword, validateImgType } = require('../validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Category = require('../models/categoryModel');

//NOTE - Register a new buyer account
// route "/register"
const registerBuyerAccount = asyncHandler(async (req, res) => {
    const { name, email, mobileNumber, password } = req.body;
    if (!name || !email || !mobileNumber || !password || name.length < 3 || !validateEmail(email) || !validatePhoneNumber(mobileNumber) || !validatePassword(password)) {
        res.status(401);
        throw new Error("Inputs are not valid")
    }
    const isBuyerPresent = await Buyer.findOne({ $or: [{ email, mobileNumber }] });
    if (isBuyerPresent) {
        res.status(409);
        throw new Error("Email or mobile number already exists")
    }

    //NOTE - add password salt and hash password generate
    const hashPassword = await bcrypt.hash(password + process.env.PASSWORD_SALT, 10);
    const buyer = await Buyer.create({
        name,
        email,
        mobileNumber,
        password: hashPassword
    });

    buyer && res.json({ message: 'Account registered successfully', user: buyer });
})

//NOTE - login buyer account 
// route "/login"
const loginBuyerAccount = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401);
        throw new Error("Inputs are not valid")
    }

    const buyer = await Buyer.findOne({ email })
    if (password && await bcrypt.compare(password + process.env.PASSWORD_SALT, buyer.password)) {
        const jsonToken = jwt.sign(
            {
                buyer: {
                    id: buyer.id,
                    name: buyer.name,
                    email: buyer.email,
                    mobileNumber: buyer.mobileNumber
                }
            },
            process.env.ACCESS_TOKE_SECRET,
            { expiresIn: "5d" }
        )
        res.status(200).json(jsonToken)
    }
    else {
        res.status(401)
        throw new Error("Password not valid")
    }

})

//NOTE - get login buyer account details
// route "/current"
const currentBuyer = asyncHandler(async (req, res) => {
    const buyer = await Buyer.findById(req.buyer.id)
    const { name, email, mobileNumber, profile_photo, profile_photo_type, cartItem } = buyer

    res.status(200).json({ name, email, mobileNumber, profile_photo, profile_photo_type, cartItem })
})

//NOTE - upload profile photo
// route "/upload-profile-photo
const uploadProfilePhoto = asyncHandler(async (req, res) => {
    const { buffer, mimetype, size } = req.file;
    const { id } = req.buyer;
    if (!buffer || !mimetype || !size) {
        res.status(422);
        throw new Error("input not valid")
    }
    if (!validateImgType(mimetype)) {
        res.status(403)
        throw new Error("Except only jpeg or png type image");
    }

    if (size > (3 * 1024 * 1024)) {
        res.status(403)
        throw new Error("photo must be less than 2mb")
    }

    if (!id) {
        res.status(401);
        throw new Error("buyer not authorized")
    }

    const buyer = await Buyer.findById(id);

    if (!buyer) {
        res.status(404);
        throw new Error("Account not found")
    }
    //NOTE - convert buffer to base^4 string

    const bufferData = Buffer.from(buffer, 'binary')
    const imagString = bufferData.toString("base64");
    //NOTE -  Upload 
    buyer.profile_photo = imagString;
    buyer.profile_photo_type = mimetype;
    await buyer.save();

    res.status(200).json({ message: "Profile picture uploaded" })
})

//NOTE -  add cartItem 
// route "add-cart-item" 
const addCartItem=asyncHandler(async(req,res)=>{
    const {Seller_Id,Category_Id,Item_Id}=req.body;
    if(!req.buyer.id){
        res.status(401);
        throw new Error("Unauthorize")
    }
    const buyer =await Buyer.findById(req.buyer.id);
// console.log('ch');
    buyer.cartItem.push({Seller_Id,Category_Id,Item_Id})
   await buyer.save();
   res.status(200).json("Item added in cart")
})

//NOTE - get cart Item details
//route "/get-cart-item"
const getCartItem=asyncHandler(async(req,res)=>{
    if(!req.buyer.id){
        res.status(401);
        throw new Error("Unauthorize")
    }
    const buyer =await Buyer.findById(req.buyer.id);
    const {cartItem}=buyer;
    const items=await Promise.all(cartItem.map(async({Seller_Id,Category_Id,Item_Id})=>{
        const category=await Category.findOne({seller_Id:Seller_Id,_id:Category_Id})
        const item=await category.item.id(Item_Id);
        return item;
    }))
    res.status(200).json(items)
}

)

module.exports = { registerBuyerAccount, loginBuyerAccount, currentBuyer, uploadProfilePhoto,addCartItem,getCartItem}