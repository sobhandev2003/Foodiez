const mongoose=require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
let storage;
const connectDb=async()=>{
    try{
                const connect=await mongoose.connect(process.env.CONECTION_STRING);
                const database=connect.connection;
                    storage = new GridFsStorage({ db: database });
                console.log( connect.connection.name , connect.connection.host);
                // return connect;
    }
    catch(err){
        console.log(err);
    }
}
upload = multer({ storage });
module.exports={connectDb,upload}