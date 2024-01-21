const asyncHandler = require('express-async-handler')

const Category=require('../models/categoryModel')

//NOTE - Get all item
//route('/:id/item')

const getItems = asyncHandler(
    async (req, res) => {
       
        const category=await Category.findById(req.params.id);
        
        if(!category){
            res.status(404);
            throw new Error("Not found");
        }
        
        res.status(200).json(category.item)
    }
)

//NOTE - get a item by id
//('/:id/item/:itemid')

const getItem = asyncHandler(
    async (req, res) => {
        const category=await Category.findById(req.params.id);
        // console.log(category.categoryname);
        if(!category){
            res.status(404);
            throw new Error("Not found");
        }
        
        const item= category.item.id(req.params.itemid);
       
        if(!item){
            res.status(404);
            throw new Error("Not found");
        }
        res.status(200).json(item)
    }
)
//NOTE - Create item
//route('/:id/item')
const createItem = asyncHandler(async (req, res) => {
    const category=await Category.findById(req.params.id);

    
    if(!category){
        res.status(404);
        throw new Error("Not found");
    }

    const { name, description, price } = req.body;
    if (!name || !description || !price) {
        console.log("data is not valid");
        res.status(401);
        throw new Error("data is not valid");
    }

     category.item.push(req.body);
    await category.save();
    res.status(200).json({msg:"Sucessfuly added"});
}
)

//NOTE - 
//route('/id)
//for delete a menu by id
const deleteItem = asyncHandler(
    async (req, res) => {
        const category=await Category.findById(req.params.id);
        // console.log(category.categoryname);
        if(!category){
            res.status(404);
            throw new Error("Not found");
        }
       //NOTE - find item 
        const item=await category.item.id(req.params.itemid);
       
        if(!item){
            res.status(404);
            throw new Error("Not found");
        }
const {id,itemid}=req.params;
const updatedCategory=await Category.findByIdAndUpdate(
  id,
  {$pull:{item:{_id:itemid}}} ,
  {new:true} 
)
        res.status(200).json(updatedCategory)
    }
)

//NOTE - 
//route('/id)
//for update a menu by id
const updateItem = asyncHandler(  async (req, res) => {
    //NOTE - find category
        const category=await Category.findById(req.params.id);
        // console.log(category.categoryname);
        if(!category){
            res.status(404);
            throw new Error("Not found");
        }
       //NOTE - find item 
        const item=await category.item.id(req.params.itemid);
       
        if(!item){
            res.status(404);
            throw new Error("Not found");
        }

        const{name,description,price}=req.body;
        item.name=name;
        item.description=description;
        item.price=price;
        await category.save();
        res.json(item)
    }
)

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }