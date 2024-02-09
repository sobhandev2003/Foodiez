const express = require('express');
const { registerSeller,
    loginSeller,
    forgotpassword,
    currentSeller,
    deletetSeller,
    getAllSeller,
    updateImage,
    getSellerOrder, 
    cancelOrderBySeller} = require('../controllers/sellerControlers');
const validateSellerToken = require('../middilware/validateSellerJwtToken');
const { upload } = require('../config/conectDb');



const Router = express.Router();


Router.post('/register', upload.single('photo'), registerSeller);
Router.post('/login', loginSeller)
Router.post('/upload-profile-photo', validateSellerToken, upload.single('photo'), updateImage)
Router.put('/forgotpassword', forgotpassword)
Router.get('/current', validateSellerToken, currentSeller)
Router.delete('/delete', validateSellerToken, deletetSeller)
//NOTE - get all seller 
Router.get('/', getAllSeller)
//NOTE - Get Order 
Router.route("/order").get(validateSellerToken, getSellerOrder);
Router.route("/order/cancel/:id").put(validateSellerToken, cancelOrderBySeller);

module.exports = Router