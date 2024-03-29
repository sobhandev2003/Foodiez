const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const Seller = require('../models/sellerModel');
const { validateEmail, validatePhoneNumber, validatePassword, validateImgType, wordsValidator } = require('../validator');
const Category = require('../models/categoryModel');
const DeliveryAddress = require('../models/deliveryAddressModel');
const Order = require('../models/orderModel')
const Buyer = require('../models/buyerModel');
const DeliveryAddressa = require('../models/deliveryAddressModel')

//NOTE - for register a saller
// Router.post('/register',)
const registerSeller = asyncHandler(async (req, res) => {

  const { restaurantName, ownerName, email, mobile, address, password } = req.body;
  const { buffer, mimetype, size } = req.file

  //NOTE - check inputs are valid or not
  if (!restaurantName || !ownerName || !email || !mobile || !password || !address || !buffer || !mimetype) {
    res.status(403)
    throw new Error("input format is not valid")
  }

  if (restaurantName.length < 4 || ownerName.length < 4 || !wordsValidator(address) || !validateEmail(email) || !validatePhoneNumber(mobile) || !validatePassword(password)) {
    res.status(403)
    throw new Error("input format is not valid")
  }

  const isAvailableMail = await Seller.findOne({ email });

  if (isAvailableMail) {
    res.status(409);
    throw new Error("All ready register this email")
  }
  const isAvailableMobile = await Seller.findOne({ mobile });

  if (isAvailableMobile) {
    res.status(401);
    throw new Error("All ready register this number")
  }

  if (!validateImgType(mimetype)) {
    res.status(403)
    throw new Error("Except only jpeg or png type image");
  }


  if (size > (2 * 1024 * 1024)) {
    res.status(403)
    throw new Error("photo must be less than 2mb")
  }

  //
  // SECTION - create a new seller
  //NOTE - convert buffer to base64

  const bufferData = Buffer.from(buffer, 'binary');
  const imgString = bufferData.toString('base64');

  //NOTE - add salt with password and hash
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const hashPassword = await bcrypt.hash(passwordWithSalt, 10)

  try {
    const seller = await Seller.create(
      {
        restaurantName, ownerName, email, mobile, address,
        img: imgString, imgType: mimetype, password: hashPassword

      }
    )

    res.status(200).json({ message: "Successfully  register seller email" })
  } catch (error) {
    res.status(403).json(error)
  }
})

//SECTION -  for Login a saller
// Router.post('/login',)
const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403);
    throw new Error("email and password not valid");
  }
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const seller = await Seller.findOne({ email });

  if (seller && (await bcrypt.compare(passwordWithSalt, seller.password))) {
    const jsonToken = jwt.sign(
      {
        seller: {
          user_role: seller.user_role,
          ownerName: seller.ownerName,
          restaurantName: seller.restaurantName,
          email: seller.email,
          id: seller._id
        }
      },
      process.env.ACCESS_TOKE_SECRET
      ,
      {
        expiresIn: "10d"
      }
    )
    res.status(200).json(jsonToken)
  }
  else {

    res.status(403);
    throw new Error("email and password not valid");
  }
})

//NOTE -  - for resturent photo  saller account
// Router.get('/updateimage',)
const updateImage = asyncHandler(async (req, res) => {
  const { buffer, mimetype, size } = req.file;
  const { id } = req.seller;
  //SECTION - check seller authorizetion and find seller
  if (!id) {
    res.status(401);
    throw new Error("seller not authorized")
  }

  const seller = await Seller.findById(id);

  if (!seller) {
    res.status(404);
    throw new Error("Account not found")
  }
  //SECTION -  - check all inputs are valid or not
  if (!buffer || !mimetype || !size) {
    res.status(403);
    throw new Error("input not valid");

  }
  if (!validateImgType(mimetype)) {
    res.status(403)
    throw new Error("Except only jpeg or png type image");
  }

  if (size > (3 * 1024 * 1024)) {
    res.status(403)
    throw new Error("photo must be less than 2mb")
  }

  //SECTION - convet buffer to base^4String and save it
  const bufferData = Buffer.from(buffer, 'binary');
  const imgString = bufferData.toString('base64');
  seller.img = imgString;
  seller.imgType = mimetype;
  await seller.save();
  res.status(200).json({ message: "image update successfully" })
})

//NOTE - for forgot password  saller account
// Router.get('/forgotpassword',)
const forgotpassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403);
    throw new Error("email and password not valid");
  }
  const passwordWithSalt = password + process.env.PASSWORD_SALT;
  const seller = await Seller.findOne({ email });
  if (!seller) {
    res.status(403);
    throw new Error("email  not valid");
  }
  const hashPassword = await bcrypt.hash(passwordWithSalt, 10)
  seller.password = hashPassword;
  await seller.save();
  res.status(200).json({ massage: "password updated" })
})

//NOTE - for current  saller details
// Router.get('/current',)
const currentSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller.id);
  const sellerGivenData = {
    user_role: seller.user_role,
    ownerName: seller.ownerName,
    restaurantName: seller.restaurantName,
    email: seller.email,
    profile_photo: seller.img,
    profile_photoType: seller.imgType,
    id: seller.id
  }
  res.status(200).json(sellerGivenData)
})

//NOTE - Get all seller account
const getAllSeller = asyncHandler(async (req, res) => {
  const { restaurantName, rating } = req.query;

  const queryObject = {}
  if (restaurantName) {

    queryObject.restaurantName = { $regex: restaurantName, $options: 'i' }
  }
  if (rating) {
    queryObject.rating = { $gt: rating }
  }
  const data = await Seller.find(queryObject);

  const sellers = data.map((d) => {
    const seller = {
      id: d.id,
      restaurantName: d.restaurantName,
      address: d.address,
      rating: d.rating,
      img: d.img,
      imgType: d.imgType

    }
    return seller;
  })
  res.status(200).json(sellers);
})

//NOTE - Get a seller by id
const getSellerById = asyncHandler(async (req, res) => {
  const seller_Id = req.params.id;
  if (!seller_Id) {
    res.status(403);
    throw new Error("Invalid request")
  }
  const seller = await Seller.findById(seller_Id);
  if (!seller) {
    res.status(404);
    throw new Error("Not found")
  }
  const { restaurantName, ownerName, address, rating } = seller
  res.status(200).json({ restaurantName, ownerName, address, rating })
})

//NOTE - get seller order item
const getSellerOrder = asyncHandler(async (req, res) => {
  // Buyer_Id
  const Seller_Id = req.seller.id;
  if (!Seller_Id) {
    res.status(401);
    throw new Error("Unauthorize")
  }

  const { order_Id } = req.query;
  //NOTE -  Validate the format of order_Id
  if (order_Id && !mongoose.isValidObjectId(order_Id)) {
    res.status(400);
    throw new Error("Invalid order ID");
  }

  //NOTE - gate full order details a specific order
  if (order_Id && mongoose.isValidObjectId(order_Id)) {
    const order = await Order.findById(order_Id);
    if (!order) {
      res.status(404);
      throw new Error("Not found")
    }
    const { _id,
      Buyer_Id,
      Category_Id,
      Item_Id,
      DeliveryAddress_id,
      Delivered_Time,
      Order_Cancel_Time,
      createdAt,
      Buyer_Name,
      Contact_Number,
      Rating,
      Feedback,
      Order_Cancel_By,
      Order_Cancel_Reason } = order
    const address = await DeliveryAddress.findOne({ _id: DeliveryAddress_id, Buyer_Id });
    const category = await Category.findOne({ seller_Id: Seller_Id, _id: Category_Id })
    const item = await category.item.id(Item_Id);
    const orderTime = createdAt.toLocaleString();
    const orderCancelTime = Order_Cancel_Time && Order_Cancel_Time.toLocaleString()
    const orderDeliverTime = Delivered_Time && Delivered_Time.toLocaleString()
    res.status(200).json({
      id: _id,
      Buyer_Name,
      Contact_Number,
      item, address,
      orderTime,
      orderCancelTime,
      Order_Cancel_By,
      Order_Cancel_Reason,
      orderDeliverTime,
      Rating,
      Feedback
    })
  }

  else {
    //NOTE - gate all order item 
    // const orders = await Order.find({ Seller_Id })
    const { status } = req.query;
    let orders;
    switch (status) {
      case 'pending':
        orders = await Order.find({ Seller_Id, Delivered: false, Order_Cancel: false });
        break;
      case 'canceled':
        orders = await Order.find({ Seller_Id, Order_Cancel: true });
        break;
      case 'delivered':
        orders = await Order.find({ Seller_Id, Delivered: true });
        break;
      default:
        // If no status is specified, return all orders
        orders = await Order.find({ Seller_Id });
        break;
    }

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

//NOTE - gate Number of pending order
const getPendingOrder = asyncHandler(async (req, res) => {
  const Seller_Id = req.seller.id;
  if (!Seller_Id) {
    res.status(401);
    throw new Error("Unauthorize")
  }
  const orders = await Order.find({ Seller_Id, Delivered: false, Order_Cancel: false });
  if (!orders) {
    res.status(404);
    throw new Error("Not found")
  }
  res.status(200).json({ numberOfPendingOrder: orders.length })
})

//NOTE - Update delivery status
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const Seller_Id = req.seller.id;
  const order_Id = req.params.id;
  if (!Seller_Id) {
    res.status(401);
    throw new Error("Unauthorize")
  }
  if (!order_Id) {
    res.status(422);
    throw new Error("Request not valid")
  }
  const order = await Order.findOne({
    _id: order_Id,
    Order_Cancel: false,
    Delivered: false
  });
  if (!order) {
    res.status(404);
    throw new Error("Order not found")
  }
  await Order.findOneAndUpdate({
    _id: order_Id,
    Order_Cancel: false,
    Delivered: false
  },
    {
      Delivered: true
    },
    { new: true })

  res.status(200).json({ message: "Order Delivered" })
})

//NOTE - cancel seller order item
const cancelOrderBySeller = asyncHandler(async (req, res) => {
  const Seller_Id = req.seller.id;
  const Order_Id = req.params.id;
  const { reason } = req.body;
  if (!Seller_Id) {
    res.status(401);
    throw new Error("Unauthorize")
  }
  if (!Order_Id || !reason) {
    res.status(422);
    throw new Error("Request not valid")
  }
  const order = await Order.findOne({ _id: Order_Id, Seller_Id, Order_Cancel: false, Delivered: false });
  if (!order) {
    res.status(404);
    throw new Error("Order Not found")
  }
  const updatedOrder = await Order.findOneAndUpdate({ _id: Order_Id, Seller_Id, Order_Cancel: false, Delivered: false },
    {
      Order_Cancel: true,
      Order_Cancel_By: "Seller",
      Order_Cancel_Reason: reason,
    },
    { new: true }
  );

  res.status(200).json({ msg: "Order Cancel", updatedOrder })
})

//NOTE - Update seller rating

const updateSellerRating = asyncHandler(async ({ Seller_Id, rating }) => {
  const seller = await Seller.findById(Seller_Id);

  let totalRating = (seller.rating * seller.numberOfRating) + rating;
  let numberOfRating = seller.numberOfRating + 1;

  seller.rating = parseFloat((totalRating / numberOfRating).toFixed(1));

  seller.numberOfRating = numberOfRating;

  await seller.save();
  return;
}
)
module.exports = {
  registerSeller,
  loginSeller,
  updateImage,
  forgotpassword,
  currentSeller,
  getAllSeller,
  getSellerById,
  getSellerOrder,
  getPendingOrder,
  updateDeliveryStatus,
  cancelOrderBySeller,
  updateSellerRating
}