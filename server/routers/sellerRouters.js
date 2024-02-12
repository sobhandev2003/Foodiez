const express = require('express');
const { registerSeller,
    loginSeller,
    forgotpassword,
    currentSeller,
    deletetSeller,
    getAllSeller,
    updateImage,
    getSellerOrder, 
    cancelOrderBySeller,
    updateDeliveryStatus,
    getSellerById} = require('../controllers/sellerControlers');
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
//NOTE - get a seller by id 
Router.route('/:id').get(getSellerById)
//NOTE - Get Order 
Router.route("/order").get(validateSellerToken, getSellerOrder);
Router.route("/order/cancel/:id").put(validateSellerToken, cancelOrderBySeller);
Router.route("/order/deliver/:id").put(validateSellerToken,updateDeliveryStatus)


module.exports = Router