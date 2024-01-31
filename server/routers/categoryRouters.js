const express=require('express');
const {getCategories,getCategory,createCategory,deleteCategory} = require('../controllers/categoryControlers');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/itemControllers');
const validateToken=require('../middilware/validateJwtToken');
const { upload } = require('../config/conectDb');


const Router=express.Router();
//SECTION - category router
Router.route('/').post(validateToken,createCategory)
Router.route('/:seller_id').get(getCategories);
Router.route('/:id').get(getCategory).post(validateToken,deleteCategory);//NOTE - delete a category post method use for accept password
//SECTION - item router
Router.route('/:id/item').post(validateToken,upload.single("photo"),createItem).get(getItems);
Router.route('/:id/item/:itemid').get(getItem).put(validateToken,updateItem).post(validateToken,deleteItem)//NOTE - delete a item post method use for accept password
//SECTION - item router
module.exports=Router