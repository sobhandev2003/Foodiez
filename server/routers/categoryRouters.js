const express=require('express');
const {getCategories,getCategory,createCategory,deleteCategory} = require('../controllers/categoryControlers');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/itemControllers');
const validateToken=require('../middilware/validateJwtToken');
const { upload } = require('../config/conectDb');


const Router=express.Router();
//SECTION - category router
Router.route('/').post(validateToken,createCategory)
Router.route('/:seller_id').get(getCategories);
Router.route('/:id').get(getCategory).delete(validateToken,deleteCategory);
//SECTION - item router
Router.route('/:id/item').post(validateToken,upload.single("photo"),createItem).get(getItems);
Router.route('/:id/item/:itemid').get(getItem).put(validateToken,updateItem).delete(validateToken,deleteItem)
module.exports=Router