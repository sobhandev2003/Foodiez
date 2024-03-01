const asyncHandler = require('express-async-handler')
const fs = require('fs')
const bcrypt = require('bcrypt');
const Seller = require('../models/sellerModel');
const Category = require('../models/categoryModel');
const { validateImgType } = require('../validator');
const { updateSellerRating } = require('./sellerControlers');
const Order = require('../models/orderModel')
//NOTE - Get all item
//route('/:id/item')

const getItems = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error("Not found");
    }

    res.status(200).json(category.item)
})


//NOTE - get a item by id
//route('/:id/item/:itemid')
const getItem = asyncHandler( async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404);
            throw new Error("Not found");
        }

        const item = category.item.id(req.params.itemid);

        if (!item) {
            res.status(404);
            throw new Error("Not found");
        }

        res.status(200).json(item)

    })

//NOTE - Create item
//route('/:id/item')
const createItem = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error("Not found");
    }
    const { buffer, mimetype, size } = req.file;
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
        res.status(401);
        throw new Error("data is not valid");
    }
    if (!validateImgType(mimetype)) {
        res.status(403)
        throw new Error("Except only jpeg or png type image");
    }
    if (size > (2 * 1024 * 1024)) {
        res.status(403)
        throw new Error("photo must be less than 2mb")
    }

    //SECTION - create a new item
    //NOTE - convert buffer to base64

    const bufferData = Buffer.from(buffer, 'binary');
    const photoString = bufferData.toString('base64');

    const item = {
        name: name,
        description: description,
        price: price,
        photo: photoString,
        photoType: mimetype
    }
    category.item.push(item);
    await category.save();
    res.status(200).json({ msg: "Sucessfuly added" });
})

//NOTE - 
//route('/id)
//for delete a menu by id
const deleteItem = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { id, itemid } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        res.status(404);
        throw new Error("Not found");
    }
    //NOTE - find item 
    const item = await category.item.id(itemid);

    if (!item) {
        res.status(404);
        throw new Error("Not found");
    }

    const seller = await Seller.findById(req.seller.id);
    if (!seller) {
        res.status(403);
        throw new Error("Account not found.");
    }

    const passwordWithSalt = password + process.env.PASSWORD_SALT;
    if (seller && (await bcrypt.compare(passwordWithSalt, seller.password))) {
        const itemOrder= await Order.deleteMany({Item_Id:item})

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $pull: { item: { _id: itemid } } },
            { new: true }
        )
        res.status(200).json(updatedCategory)
    }
    else {
        res.status(403);
        throw new Error("Password not match");
    }
})

//NOTE - 
//route('/id)
//for update a menu by id
const updateItem = asyncHandler(async (req, res) => {
    //NOTE - find category
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Not found");
    }
    //NOTE - find item 
    const item = await category.item.id(req.params.itemid);

    if (!item) {
        res.status(404);
        throw new Error("Not found");
    }
    const { description, price } = req.body;
    if (description) {
        item.description = description;
    }
    if (price) {
        item.price = price;
    }

    await category.save();
    res.json(item)
})

//NOTE - update rating
const updateItemRating = asyncHandler(async ({ Seller_Id, categoryId, itemId, rating }) => {
    if (rating < 0 || rating > 5) {
        return { status: 422, message: "Rating not valid" }
    }
    const category = await Category.findById(categoryId);
    if (!category) {
        return { status: 404, message: "Category not fond" }
    }
    //NOTE - find item 
    const item = await category.item.id(itemId);
    if (!item) {
        return { status: 404, message: "Not found" };
    }
    //NOTE - Calculate rating;
    const totalRating = item.rating * item.numberOfRating;
    const newRating = (totalRating + rating) / (item.numberOfRating + 1);
    if (newRating >= 0 && newRating <= 5) {
        item.rating = newRating;
        item.numberOfRating = item.numberOfRating + 1
    }
    await category.save();
    
    updateSellerRating({ Seller_Id, rating })
    return { status: 200, message: "Rating updated" }
})

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, updateItemRating }