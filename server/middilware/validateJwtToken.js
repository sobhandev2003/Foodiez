const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
 const validateToken=asyncHandler(
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
                    req.seller=decode.seller;
                    next();
                })

        }
        else{
            res.status(401);
            throw new Error("Seller details no valid");
        }
    }
 )

 module.exports=validateToken