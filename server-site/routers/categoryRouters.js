const express = require('express');
const { getCategories, getCategory, createCategory, deleteCategory } = require('../controllers/categoryControlers');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/itemControllers');
const validateToken = require('../middilware/validateSellerJwtToken');
const { upload } = require('../config/conectDb');


const Router = express.Router();
//SECTION - category router
//NOTE - Create anew category
Router.route('/').post(validateToken, createCategory)

//NOTE - Gate categories by by seller id get a specific seller all category
Router.route('/:seller_id').get(getCategories);

//NOTE - delete a category.  Post method use for accept password if password match then delete
Router.route('/:id').get(getCategory).post(validateToken, deleteCategory);

//SECTION - item router
//NOTE - create a new item for a category and gate all item a specific category
Router.route('/:id/item').post(validateToken, upload.single("photo"), createItem).get(getItems);

//NOTE - delete a item. Post method use for accept password and if password match then delete item
Router.route('/:id/item/:itemid').get(getItem).put(validateToken, updateItem).post(validateToken, deleteItem)

module.exports = Router