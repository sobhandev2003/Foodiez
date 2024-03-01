const mongoose = require('mongoose');
const { validatePhoneNumber, isValidRating } = require('../validator');

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
        Buyer_Name: {
            type: String,
            required: [true, "Buyer name method mandatory"]
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
            required: [true, "Payment method mandatory"],
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
            validate: {
                validator: () => {
                    return !this.Delivered || (this.Delivered && this.Delivered_Time);
                },
                message: "Delivered Time is required after Delivered  is true"
            },
            default: null
        },

        Order_Cancel: {
            type: Boolean,
            default: false,
        },
        Order_Cancel_By: {
            type: String,
            default: null,
            validate: {
                validator: function () {
                    return !this.Order_Cancel || (this.Order_Cancel && this.Order_Cancel_Reason);
                },
                message: "Order_Cancel_Reason is required when Order_Cancel is true"
            }
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
        Rating: {
            type: Number,
            default: -1,
            validate: {
                validator: isValidRating,
                message: props => `${props.value} is not a valid rating. Rating must be a number between 0 and 5.`
            }
        },
        Feedback: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)

orderScheme.pre('findOneAndUpdate', async function (next) {
    // Get the update object  
    const update = this.getUpdate();
    if (update.Order_Cancel === true) {
        update.Order_Cancel_Time = new Date();
    }
    if (update.Payment_Done === true) {
        update.Payment_Time = new Date();
    }
    if (update.Delivered === true) {
        update.Delivered_Time = new Date();
    }

    next();
})
orderScheme.pre('save', function (next) {
    const order = this;
    if (order.Payment_Done === true) {
        order.Payment_Time = new Date();
    }
    next();
});

module.exports = mongoose.model("Order", orderScheme)