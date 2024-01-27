const mongoose = require('mongoose');
const { validateEmail, validatePhoneNumber, validatePassword, wordsValidator } = require('../validator');

const sellerSchema = mongoose.Schema(
    {
        user_role:{
                type:String,
                default:"seller",
        },
        restaurantName: {
            type: String,
            minLength: 4,
            required: [true, "restaurantName is mandatory"]
        },
        ownerName: {
            type: String,
            minLength: 4,
            required: [true, "ownerName is mandatory"]
        },
        email: {
            type: String,
            required: [true, "email mandatory"], 
            validate: {
                validator: validateEmail,
                message: 'Invalid email address format'
            },
            unique: [true,"this emil already register"]
        },
        mobile: {
                type:String,
                required:[true,"mobile number mandatory"],
                validate:{
                    validator:validatePhoneNumber,
                    message:"Invalid phone number."
                },
                unique:[true,"this mobile number already register"]
        },
        address:{
            type:String,
            required:[true,"one special food mandatory"],
           validate:{
            validator:wordsValidator,
            message:"Address content only 2 words"
           }
           },
       img:{
        type:String,
        required:[true,"photo  mandatory"],
       },
       imgType:{
            type:String
       },
      
        password:{
                type:String,
                minLength:6,
               
                required:[true,"password mandatory"],
        },
        rating:{
            type:Number,
            default:0
        },
        offer:{
            type:Boolean,
            default:false
        },
        offerDetails:{
            type:String,            
        }

    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Seller",sellerSchema);