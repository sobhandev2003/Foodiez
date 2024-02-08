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
const validateToken = require('../middilware/validateJwtToken');
const { upload } = require('../config/conectDb');



const Router = express.Router();


Router.post('/register', upload.single('photo'), registerSeller);
Router.post('/login', loginSeller)
Router.post('/upload-profile-photo', validateToken, upload.single('photo'), updateImage)
Router.put('/forgotpassword', forgotpassword)
Router.get('/current', validateToken, currentSeller)
Router.delete('/delete', validateToken, deletetSeller)
//NOTE - get all seller 
Router.get('/', getAllSeller)
//NOTE - Get Order 
Router.route("/order").get(validateToken, getSellerOrder);
Router.route("/order/cancel/:id").put(validateToken, cancelOrderBySeller);

module.exports = Router