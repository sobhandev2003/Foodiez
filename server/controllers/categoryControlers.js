const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Category = require('../models/categoryModel');
const Seller = require('../models/sellerModel');
//NOTE - get all category and iteams
// route('/')
const getCategories = asyncHandler(async (req, res) => {
    // console.log(req.params.seller_id);
    const responce = await Category.find({ seller_Id: req.params.seller_id });
    // console.log(responce);
    const categories = responce.map((data) => {
        const category = {
            id: data.id,
            name: data.name,
            item: data.item
        }
        return category;
    })
    // console.log(categories);
    res.status(200).json(categories)
})

//NOTE - get a category and items by id
const getCategory = asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404)
        throw new Error("Not found")
    }
    res.status(200).json(category)

})
//NOTE - create a category 
// route('/')
const createCategory = asyncHandler(async (req, res) => {
    const { name, item } = req.body;
    //  console.log(name);
    if (!name) {
        res.status(401)
        throw new Error("Category name Give mandatory")
    }
    if (!item) {
        const newCategory = await Category.create({ seller_Id: req.seller.id, name });
        res.status(200).json(newCategory);
    }
    else {
        const newCategory = await Category(
            { name, item }
        )
        const saveCategory = await newCategory.save()
        res.status(200).json(saveCategory)

    }
}
)
//NOTE - update a category and items by id
// const updateCategory=asyncHandler(async(req,res)=>{
//     const category=await Category.findById(req.params.id);
//     if(!category){
//         res.status(404)
//         throw new Error("Not found")
//     }
//     res.status(200).json("update category")
// }
// )


//NOTE - delete a category and items by id
const deleteCategory = asyncHandler(async (req, res) => {
    const { password } = req.body;
    // console.log(password);
    if (!password) {
        res.status(403);
        throw new Error("Password not valid");
    }
    const seller = await Seller.findById(req.seller.id);
    // console.log(seller);
    if (!seller) {
        res.status(403);
        throw new Error("Account not found.");
    }
    const passwordWithSalt = password + process.env.PASSWORD_SALT;
    if (seller && (await bcrypt.compare(passwordWithSalt, seller.password))) {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404)
            throw new Error("Not found")
        }
        await Category.deleteOne(category);
        res.status(200).json(category)
    }
    else{
        res.status(403);
        throw new Error("Password not match"); 
    }


}


)

module.exports = { getCategories, getCategory, createCategory, deleteCategory };