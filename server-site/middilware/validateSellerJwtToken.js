const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
 const validateSellerToken=asyncHandler(
    (req,res,next)=>{
        let token;
        let authHeader=req.headers.authorization || req.headers.Authorization
   
        if(authHeader && authHeader.startsWith("Bearer")){
           
                token=authHeader.split(" ")[1];
                jwt.verify(token,process.env.ACCESS_TOKE_SECRET,(err,decode)=>{
                    if(err){
                        res.status(401);
                    throw new Error("Seller not authorized");
                    }
                    if(decode.seller)
                    req.seller=decode.seller;

                    next();
                })

        }
        else{
            res.status(401);
            throw new Error("Seller details not valid");
        }
    }
 )


 

 module.exports=validateSellerToken