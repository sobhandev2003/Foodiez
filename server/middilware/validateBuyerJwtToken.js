const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateBuyerToken = asyncHandler(
    (req, res, next) => {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization
        // console.log(authHeader);
        if (authHeader && authHeader.startsWith("Bearer")) {

            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKE_SECRET, (err, decode) => {
                if (err) {
                    res.status(401);
                    throw new Error("Buyer not authorized");
                }
                
                req.buyer = decode.buyer;
                next();
            })

        }
        else {
            res.status(401);
            throw new Error("Buyer details no valid");
        }
    }
)

module.exports = validateBuyerToken