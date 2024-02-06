const mongoose = require('mongoose');

const orderScheme = mongoose.Schema(
    {
        Buyer_Id: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Buyer Id mandatory"]
        },
        Seller_Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Seller ID mandatory"]
        },
        Category_Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Category Id mandatory"]
        },
        Item_Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Item Id mandatory"]
        },
        DeliveryAddress_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:[true,"Delivery Id mandatory"]
        },
        Order_Cancel:{
            type:Boolean,
            default:false,
        },
        Order_Cancel_Reason:{
            type:String,
            default:null,
            validate: {
                validator: function () {
                    // Custom validation logic
                    return !this.Order_Cancel || (this.Order_Cancel && this.Order_Cancel_Reason);
                },
                message: "Order_Cancel_Reason is required when Order_Cancel is true"
            }
        }
        


    },
    {
        timestamps: true
    }
)

module.exports=mongoose.model("Order",orderScheme)