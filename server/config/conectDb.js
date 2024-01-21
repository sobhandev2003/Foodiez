const mongoose=require('mongoose');

const connectDb=async()=>{
    try{
                const connect=await mongoose.connect(process.env.CONECTION_STRING);
                console.log( connect.connection.name , connect.connection.host);
    }
    catch(err){
        console.log(err);
    }
}
module.exports=connectDb