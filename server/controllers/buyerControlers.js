const asyncHandler = require('express-async-handler');
const Buyer = require('../models/buyerModel');
const { validateEmail, validatePhoneNumber, validatePassword, validateImgType, validateCountryName, validateState, validatePostalCode } = require('../validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Category = require('../models/categoryModel');
const DeliveryAddress = require('../models/deliveryAddressModel');
const Order = require('../models/orderModel')
//NOTE - Register a new buyer account
// route "/register"
const registerBuyerAccount = asyncHandler(async (req, res) => {
    const { name, email, mobileNumber, password } = req.body;
    if (!name || !email || !mobileNumber || !password || name.length < 3 || !validateEmail(email) || !validatePhoneNumber(mobileNumber) || !validatePassword(password)) {
        res.status(401);
        throw new Error("Inputs are not valid")
    }
    const isBuyerPresent = await Buyer.findOne({ $or: [{ email, mobileNumber }] });
    if (isBuyerPresent) {
        res.status(409);
        throw new Error("Email or mobile number already exists")
    }

    //NOTE - add password salt and hash password generate
    const hashPassword = await bcrypt.hash(password + process.env.PASSWORD_SALT, 10);
    const buyer = await Buyer.create({
        name,
        email,
        mobileNumber,
        password: hashPassword
    });

    buyer && res.json({ message: 'Account registered successfully', user: buyer });
})

//NOTE - login buyer account 
// route "/login"
const loginBuyerAccount = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401);
        throw new Error("Inputs are not valid")
    }

    const buyer = await Buyer.findOne({ email })
    if (buyer && await bcrypt.compare(password + process.env.PASSWORD_SALT, buyer.password)) {
        const jsonToken = jwt.sign(
            {
                buyer: {
                    id: buyer.id,
                    name: buyer.name,
                    email: buyer.email,
                    mobileNumber: buyer.mobileNumber
                }
            },
            process.env.ACCESS_TOKE_SECRET,
            { expiresIn: "5d" }
        )
        res.status(200).json(jsonToken)
    }
    else {
        res.status(401)
        throw new Error("Password not valid")
    }

})

//NOTE - get login buyer account details
// route "/current"
const currentBuyer = asyncHandler(async (req, res) => {
    const buyer = await Buyer.findById(req.buyer.id)
    const { user_role, id, name, email, mobileNumber, profile_photo, profile_photo_type, cartItem } = buyer

    res.status(200).json({ user_role, id, name, email, mobileNumber, profile_photo, profile_photo_type, cartItem })
})

//NOTE - upload profile photo
// route "/upload-profile-photo
const uploadProfilePhoto = asyncHandler(async (req, res) => {
    const { buffer, mimetype, size } = req.file;
    const { id } = req.buyer;
    if (!buffer || !mimetype || !size) {
        res.status(422);
        throw new Error("input not valid")
    }
    if (!validateImgType(mimetype)) {
        res.status(403)
        throw new Error("Except only jpeg or png type image");
    }

    if (size > (3 * 1024 * 1024)) {
        res.status(403)
        throw new Error("photo must be less than 2mb")
    }

    if (!id) {
        res.status(401);
        throw new Error("buyer not authorized")
    }

    const buyer = await Buyer.findById(id);

    if (!buyer) {
        res.status(404);
        throw new Error("Account not found")
    }
    //NOTE - convert buffer to base^4 string

    const bufferData = Buffer.from(buffer, 'binary')
    const imagString = bufferData.toString("base64");
    //NOTE -  Upload 
    buyer.profile_photo = imagString;
    buyer.profile_photo_type = mimetype;
    await buyer.save();

    res.status(200).json({ message: "Profile picture uploaded" })
})

//NOTE -  add cartItem 
// route "/cart-item" 
const addCartItem = asyncHandler(async (req, res) => {
    const { Seller_Id, Category_Id, Item_Id } = req.body;
    if (!req.buyer.id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    const buyer = await Buyer.findById(req.buyer.id);
    // console.log('ch');
    buyer.cartItem.push({ Seller_Id, Category_Id, Item_Id })
    await buyer.save();
    res.status(200).json("Item added in cart")
})

//NOTE - get cart Item details
//route "/cart-item"
const getCartItem = asyncHandler(async (req, res) => {
    if (!req.buyer.id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    const buyer = await Buyer.findById(req.buyer.id);
    const { cartItem } = buyer;
    const items = await Promise.all(cartItem.map(async ({ Seller_Id, Category_Id, Item_Id }) => {
        const category = await Category.findOne({ seller_Id: Seller_Id, _id: Category_Id })
        const item = await category.item.id(Item_Id);
        return item;
    }))
    res.status(200).json(items)
})

//NOTE - Delete Cart Item
//route "/cart-item/:id"
const deleteCartItem = asyncHandler(async (req, res) => {
    const itemId = req.params.id;
    const buyerId = req.buyer.id

    if (!buyerId) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    const buyer = await Buyer.findById(req.buyer.id);
    if (!buyer) {
        res.status(404);
        throw new Error("Buyer Account Not Found")
    }
    const index = buyer.cartItem.findIndex(item => item.Item_Id == itemId);

    if (index === -1) {
        res.status(404);
        throw new Error('Item not found in cart')
    }
    // Remove the cart item from the array
    buyer.cartItem.splice(index, 1);
    // Save the updated buyer document
    await buyer.save();
    res.status(200).send({ message: 'CartItem deleted successfully' });
})


//NOTE - create a new deliver address
//route "/delivery-address"
const createDeliveryAddress = asyncHandler(async (req, res) => {
    const { country, state, district, postCode, city, street, additionalInfo } = req.body;
    // console.log(req.buyer);
    const { id } = req.buyer;
    if (!id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    //SECTION - check address valid or not
    if (!street || !city || !state || !district || !postCode || !country) {
        res.status(422);
        throw new Error("Address not valid")
    }
    const countryCode = validateCountryName(country);
    const stateCode = validateState(state);
    // console.log(countryCode);
    if (!countryCode || !stateCode) {
        res.status(422);
        throw new Error("Address not valid")
    }
    const isValidPostalCode = validatePostalCode(countryCode, postCode);
    if (isValidPostalCode != true) {
        res.status(422);
        throw new Error(isValidPostalCode)
    }

    const newAddrees = await DeliveryAddress.create(
        {
            Buyer_Id: id, street, city, state, district, postCode, country, additionalInfo
        }
    )
    res.status(200).json({ message: "Successfully added new address" })
});
//NOTE - get login account all delivery address
//route  "/delivery-address"
const gateDeliveryAddress = asyncHandler(async (req, res) => {
    const Buyer_Id = req.buyer.id;
    if (!Buyer_Id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    const address = await DeliveryAddress.find({ Buyer_Id })
    res.status(200).json(address);
})

//NOTE - Place new order
// route "/order" 
const placeOrder = asyncHandler(async (req, res) => {
    const { DeliveryAddress_id, OrderItems, Contact_Number, Payment_methods, Buyer_Name, Payment_Done } = req.body;
    const Buyer_Id = req.buyer.id;
    if (!Buyer_Id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    if (!DeliveryAddress_id || !OrderItems || !Contact_Number || !Payment_methods || !Buyer_Name) {
        res.status(422);
        throw new Error("Input not valid")
    }
    if (OrderItems.length === 0) {
        res.status(422);
        throw new Error("No item to order")
    }
    if (!validatePhoneNumber(Contact_Number)) {
        res.status(403);
        throw new Error("Contact number not valid")
    }


    await Promise.all(OrderItems.map(async ({ Seller_Id, Category_Id, Item_Id }) => {
        await Order.create(
            { Buyer_Id, Seller_Id, Category_Id, Item_Id, DeliveryAddress_id, Contact_Number, Buyer_Name, Payment_methods, Payment_Done }
        )
    }))

    const updatedBuyer = await Buyer.findOneAndUpdate({ _id: Buyer_Id },
        {
            cartItem: []
        },
        { new: true }
    );
    // console.log(updatedBuyer);
    res.status(200).json({ message: "Ordered placed" });
})

//NOTE - get user  order 
//route '/order'
const getOrder = asyncHandler(async (req, res) => {
    const Buyer_Id = req.buyer.id;
    // console.log(Buyer_Id);
    if (!Buyer_Id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    const { order_Id } = req.query;
    if (order_Id) {
        // console.log(order_Id);
        const order = await Order.findById(order_Id);
        if (!order) {
            res.status(404);
            throw new Error("Not found")
        }
        const { _id, Seller_Id, Category_Id, Item_Id, DeliveryAddress_id, Delivered_Time, Order_Cancel_Time, createdAt,
            Buyer_Name,
            Contact_Number,
            Order_Cancel_Reason } = order
        const address = await DeliveryAddress.findOne({ _id: DeliveryAddress_id, Buyer_Id });
        const category = await Category.findOne({ seller_Id: Seller_Id, _id: Category_Id })
        const item = await category.item.id(Item_Id);
        const orderTime = createdAt.toLocaleString();
        const orderCancelTime = Order_Cancel_Time && Order_Cancel_Time.toLocaleString()
        const orderDeliverTime = Delivered_Time && Delivered_Time.toLocaleString()
        res.status(200).json({id:_id,  Buyer_Name, Contact_Number,item, address, orderTime, orderCancelTime,Order_Cancel_Reason, orderDeliverTime })
    }
    else {
        const orders = await Order.find({ Buyer_Id })
        const orderItems = await Promise.all(orders.map(async ({
            _id,
            Seller_Id,
            Category_Id,
            Item_Id,
            Delivered_Time,
            Order_Cancel_Time,
            createdAt }) => {
            const category = await Category.findOne({ seller_Id: Seller_Id, _id: Category_Id })
            const item = await category.item.id(Item_Id);
            // const address = await DeliveryAddress.findOne({ _id: DeliveryAddress_id, Buyer_Id });
            const orderTime = createdAt.toLocaleString();
            const orderCancelTime = Order_Cancel_Time && Order_Cancel_Time.toLocaleString()
            const orderDeliverTime = Delivered_Time && Delivered_Time.toLocaleString()
            return {
                _id,
                item,
                orderTime,
                orderCancelTime,
                orderDeliverTime
            };
        }))
        res.status(200).json(orderItems);
    }
})

//NOTE - Cancel Order
// route "cancel/:id"
const cancelOrder = asyncHandler(async (req, res) => {
    const Buyer_Id = req.buyer.id;
    const Order_Id = req.params.id;
    const { reason } = req.body;
    if (!Buyer_Id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    if (!Order_Id || !reason) {
        res.status(422);
        throw new Error("Request not valid")
    }
    const order = await Order.findOne({ _id: Order_Id, Buyer_Id, Order_Cancel: false });
    if (!order) {
        res.status(404);
        throw new Error("Order Not found")
    }
    const updatedOrder = await Order.findOneAndUpdate({ _id: Order_Id, Buyer_Id, Order_Cancel: false },
        {
            Order_Cancel: true,
            Order_Cancel_Reason: reason,
        },
        { new: true }
    );

    res.status(200).json({ message: "Order Cancel", updatedOrder })
})

//NOTE - get cancel order
// route "/order/cancel"
const getCancelOrder = asyncHandler(async (req, res) => {
    const Buyer_Id = req.buyer.id;
    if (!Buyer_Id) {
        res.status(401);
        throw new Error("Unauthorize")
    }
    const orders = await Order.find({ Buyer_Id, Order_Cancel: true })
    const orderItems = await Promise.all(orders.map(async ({ Seller_Id,
        Category_Id,
        Item_Id,
        DeliveryAddress_id,
        Contact_Number,
        Order_Cancel_Reason,
        createdAt,
        Order_Cancel_Time
    }) => {
        const category = await Category.findOne({ seller_Id: Seller_Id, _id: Category_Id })
        const item = await category.item.id(Item_Id);
        const address = await DeliveryAddress.findOne({ _id: DeliveryAddress_id, Buyer_Id });
        const orderTime = createdAt.toLocaleString();
        const orderCancelTime = Order_Cancel_Time.toLocaleString()
        return {
            item, address, Contact_Number, Order_Cancel_Reason, orderTime, orderCancelTime
        };
    }))
    res.status(200).json(orderItems);
})

module.exports = {
    registerBuyerAccount,
    loginBuyerAccount,
    currentBuyer,
    uploadProfilePhoto,
    addCartItem,
    getCartItem,
    deleteCartItem,
    createDeliveryAddress,
    gateDeliveryAddress,
    placeOrder,
    getOrder,
    cancelOrder,
    getCancelOrder,

}