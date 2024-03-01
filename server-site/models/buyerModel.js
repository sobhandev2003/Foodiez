const Mongoose = require('mongoose');
const { validateEmail, validatePhoneNumber } = require('../validator');


const cartModel = new Mongoose.Schema({
    Seller_Id: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, "Seller ID mandatory"]
    },
    Category_Id: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, "Category Id mandatory"]
    },
    Item_Id: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, "Item Id mandatory"]
    }
},
    {
        timestamps: true
    }
)



const buyerSchema = Mongoose.Schema({
    user_role: {
        type: String,
        default: "buyer",
        immutable: true,
    },
    name: {
        type: String,
        required: [true, "Buyer Name mandatory"],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "buyer email address mandatory"],
        validate: {
            validator: validateEmail,
            message: "Email not valid"
        },
        unique: [true, "Email already register"]
    },
    mobileNumber: {
        type: Number,
        required: [true, "buyer mobile number mandatory"],
        validate: {
            validator: validatePhoneNumber,
            message: "Mobile number not valid",
        },
        unique: [true, "Mobile number already register"]
    },
    profile_photo: {
        type: String,
        default: null
    },
    profile_photo_type: {
        type: String,
        default: null
    },

    cartItem: [cartModel],

    password: {
        type: String,
        required: [true, "Password mandatory"]
    }

},
    { timestamps: true }
)

module.exports = Mongoose.model("Buyer", buyerSchema)