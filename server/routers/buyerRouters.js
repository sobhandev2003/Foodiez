const express=require('express');
const { registerBuyerAccount, loginBuyerAccount, currentBuyer, uploadProfilePhoto, addCartItem, getCartItem } = require('../controllers/buyerControlers');
const validateToken = require('../middilware/validateJwtToken');
const { upload } = require('../config/conectDb');




const Router=express.Router();

Router.route("/register").post(registerBuyerAccount);
Router.route("/login").post(loginBuyerAccount);
Router.route("/current").get(validateToken,currentBuyer);
Router.route("/upload-profile-photo").post(validateToken,upload.single('photo'),uploadProfilePhoto)
Router.route("/add-cart-item").post(validateToken,addCartItem)
Router.route("/get-cart-item").get(validateToken,getCartItem)


module.exports=Router;