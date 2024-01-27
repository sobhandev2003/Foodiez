const {httperrors}=require('../httpError');
const errorHandler=(err,req,res,next)=>{
//    console.log("ch");
    const statusCode=res.statusCode ? res.statusCode : 500;  
    switch (statusCode) {
        case httperrors.Not_Found:
            res.json({titale:"Not Found" ,message:err.message, stackTrace:err.stack});
            break;
        case httperrors.Bad_Request:
            res.json({titale:"Bad Request" ,message:err.message, stackTrace:err.stack});
            break;
        case httperrors.Unauthorized:
            res.json({titale:"Unauthorized" ,message:err.message, stackTrace:err.stack});
            break; 
        case httperrors.InvalidFormat:
            res.json({titale:"InvalidFormat" ,message:err.message, stackTrace:err.stack});
            break;  
        case httperrors.Server_Error:
            res.json({titale:"Server Error" ,message:err.message, stackTrace:err.stack});
            break;      
        default:
            res.json("No error, all god");
            break;
    }

}
module.exports=errorHandler