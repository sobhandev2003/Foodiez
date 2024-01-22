const express = require('express');
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const storage = new GridFsStorage({ url:process.env.CONECTION_STRING });

// Set multer storage engine to the newly created object
const upload = multer({ storage });

const app = express();

// Upload your files as usual

const uploadImg=async()=>{
try {
   app.post('/food/user/seller/upload', upload.single('avatar'), (req, res, next) => { 
 console.log(req);
//  next();
});

} catch (error) {
    console.log(error);
    
}
}
module.exports=uploadImg