const mongoose = require('mongoose');
const { validatePhoneNumber } = require('../validator');

const orderScheme = new mongoose.Schema(
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
        DeliveryAddress_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Delivery Id mandatory"]
        },
        Buyer_Name:{
            type: String,
            required: [true,"Buyer name method mandatory"]
        },
        Contact_Number: {
            type: Number,
            required: [true, "Contact Number mandatory"],
            validate: {
                validator: validatePhoneNumber,
                message: "Mobile number not valid",
            },
        },
        Payment_methods: {

            type: String,
            required: [true,"Payment method mandatory"],
            enum: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'UPI',]

        },
        Payment_Done: {
            type: Boolean,
            default: false
        },
        Payment_Time: {
            type: Date,
            validate: {
                validator: () => {
                    return !this.Payment_Done || (this.Payment_Done && this.paymentTime);
                },
                message: "payment Time is required after Payment Done is true"
            },
            default: null
        },
        Delivered: {
            type: Boolean,
            default: false
        },
        Delivered_Time: {
            type: Date,
            default: null
        },
        Order_Cancel: {
            type: Boolean,
            default: false,
        },
        Order_Cancel_Time: {
            type: Date,
            default: null,
        },
        Order_Cancel_Reason: {
            type: String,
            default: null,
            validate: {
                validator: function () {
                    return !this.Order_Cancel || (this.Order_Cancel && this.Order_Cancel_Reason);
                },
                message: "Order_Cancel_Reason is required when Order_Cancel is true"
            }
        },

    },
    {
        timestamps: true
    }
)

orderScheme.pre('findOneAndUpdate', async function (next) {
    // Get the update object  
    const update = this.getUpdate();
    if (update.Order_Cancel === true) {
        this.updateOne({}, { $set: { Order_Cancel_Time: new Date() } });
    }
    if (this.Payment_Done === true) {
        this.updateOne({}, { $set: { Payment_Time: new Date() } });
    }
    if (this.Delivered === true) {
        this.updateOne({}, { $set: { Delivered_Time: new Date() } });

    }
    if (this.Order_Cancel === true) {
        this.updateOne({}, { $set: { Order_Cancel_Time: new Date() } });
    }
    next();
})

module.exports = mongoose.model("Order", orderScheme)