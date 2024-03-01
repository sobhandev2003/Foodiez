const express = require('express');
const { registerSeller,
    loginSeller,
    forgotpassword,
    currentSeller,
    getAllSeller,
    updateImage,
    getSellerOrder, 
    updateDeliveryStatus,
    cancelOrderBySeller,
    getSellerById,
    getPendingOrder} = require('../controllers/sellerControlers');
const validateSellerToken = require('../middilware/validateSellerJwtToken');
//NOTE - For load Image 
const { upload } = require('../config/conectDb');

const Router = express.Router();
//NOTE - Register a new seller account
Router.post('/register', upload.single('photo'), registerSeller);

//NOTE - Login seller account
Router.post('/login', loginSeller)

//NOTE - Change profile photo
Router.post('/upload-profile-photo', validateSellerToken, upload.single('photo'), updateImage)

//NOTE - Forget account password
Router.put('/forgotpassword', forgotpassword)

//NOTE - Gate login account details
Router.get('/current', validateSellerToken, currentSeller)

//NOTE - Get Order 
Router.get('/order', validateSellerToken, getSellerOrder)

//NOTE - Update delivery status for a Order
Router.route("/order/deliver/:id").put(validateSellerToken,updateDeliveryStatus)

//NOTE - Cancel order by Seller
Router.route("/order/cancel/:id").put(validateSellerToken, cancelOrderBySeller);

//NOTE - Gate number of pending order
Router.route("/order/pending-number").get(validateSellerToken,getPendingOrder)

//NOTE - get all seller 
Router.get('/', getAllSeller)

//NOTE - get a seller by id 
Router.route('/restaurant/:id').get(getSellerById)




module.exports = Router