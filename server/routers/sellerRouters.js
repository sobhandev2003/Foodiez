const express=require('express');
const { registerSeller, loginSeller,forgotpassword, currentSeller ,deletetSeller,getAllSeller, updateImage} = require('../controllers/sellerControlers');
const validateToken = require('../middilware/validateJwtToken');
const { upload } = require('../config/conectDb');



const Router=express.Router();


Router.post('/register',upload.single('photo'),registerSeller);
Router.post('/login',loginSeller)
Router.post('/updateimage',validateToken,upload.single('photo'),updateImage)
Router.put('/forgotpassword',forgotpassword)
Router.get('/current',validateToken,currentSeller)
Router.delete('/delete',validateToken,deletetSeller)
//NOTE - get all seller 
Router.get('/',getAllSeller)

module.exports=Router