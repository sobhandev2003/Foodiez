const express=require('express');
const { registerSeller, loginSeller,forgotpassword, currentSeller ,deletetSeller} = require('../controllers/sellerControlers');
const validateToken = require('../middilware/validateJwtToken');




const Router=express.Router();

Router.post('/register',registerSeller);
Router.post('/login',loginSeller)
Router.put('/forgotpassword',forgotpassword)
Router.get('/current',validateToken,currentSeller)
Router.delete('/delete',validateToken,deletetSeller)


module.exports=Router