const express = require('express');
const { registerBuyerAccount,
    loginBuyerAccount,
    currentBuyer,
    uploadProfilePhoto,
    addCartItem,
    getCartItem,
    createDeliveryAddress,
    placeOrder,
    cancelOrder,
    getOrder,
    getCancelOrder, 
    deleteCartItem,
    gateDeliveryAddress,
    giveRating} = require('../controllers/buyerControlers');

const { upload } = require('../config/conectDb');
const validateBuyerToken = require('../middilware/validateBuyerJwtToken');




const Router = express.Router();
//NOTE - register buyer account
Router.route("/register").post(registerBuyerAccount);

//NOTE - login buyer account
Router.route("/login").post(loginBuyerAccount);

//NOTE - gate details loge in buyer account
Router.route("/current").get(validateBuyerToken, currentBuyer);

//NOTE - upload profile photo log in buyer account
Router.route("/upload-profile-photo").post(validateBuyerToken, upload.single('photo'), uploadProfilePhoto)

//NOTE - add new cart item and get all cart item details log in buyer account
Router.route("/cart-item").post(validateBuyerToken, addCartItem).get(validateBuyerToken, getCartItem)

//NOTE - Delete cart item 
Router.route("/cart-item/:id").delete(validateBuyerToken,deleteCartItem)

//NOTE - create new deliver address and get delivery address
Router.route("/delivery-address").post(validateBuyerToken, createDeliveryAddress).get(validateBuyerToken,gateDeliveryAddress)

//NOTE - get login account order and Place new Order 
Router.route("/order").get(validateBuyerToken, getOrder).post(validateBuyerToken, placeOrder)

//NOTE - cancel before order item 
Router.route("/cancel/:id").put(validateBuyerToken, cancelOrder)

//NOTE - gate all cancel order
Router.route("/order/cancel").get(validateBuyerToken, getCancelOrder);
//NOTE - Give Rating in order Item
Router.route("/rating/:id").put(validateBuyerToken, giveRating)



module.exports = Router;