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
    gateDeliveryAddress} = require('../controllers/buyerControlers');
const validateToken = require('../middilware/validateJwtToken');
const { upload } = require('../config/conectDb');




const Router = express.Router();
//NOTE - register buyer account
Router.route("/register").post(registerBuyerAccount);

//NOTE - login buyer account
Router.route("/login").post(loginBuyerAccount);

//NOTE - gate details loge in buyer account
Router.route("/current").get(validateToken, currentBuyer);

//NOTE - upload profile photo log in buyer account
Router.route("/upload-profile-photo").post(validateToken, upload.single('photo'), uploadProfilePhoto)

//NOTE - add new cart item and get all cart item details log in buyer account
Router.route("/cart-item").post(validateToken, addCartItem).get(validateToken, getCartItem)

//NOTE - Delete cart item 
Router.route("/cart-item/:id").delete(validateToken,deleteCartItem)

//NOTE - create new deliver address and get delivery address
Router.route("/delivery-address").post(validateToken, createDeliveryAddress).get(validateToken,gateDeliveryAddress)

//NOTE - get login account order and Place new Order 
Router.route("/order").get(validateToken, getOrder).post(validateToken, placeOrder)

//NOTE - cancel before order item 
Router.route("/cancel/:id").put(validateToken, cancelOrder)

//NOTE - gate all cancel order
Router.route("/order/cancel").get(validateToken, getCancelOrder);



module.exports = Router;