const mongoose = require('mongoose');
const { validateEmail, validatePhoneNumber, validatePassword } = require('../validator');

const sellerSchema = mongoose.Schema(
    {
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
        emil: {
            type: String,
            required: [true, "emil mandatory"], 
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
        special_food:{
            type:String,
            required:[true,"one special food mandatory"],
            minLength: 3,
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