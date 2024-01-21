const asyncHandler=require('express-async-handler')
const Category=require('../models/categoryModel');
//NOTE - get all category and iteams
// route('/')
const getCategories=asyncHandler(async(req,res)=>{
    
    const categories=await Category.find({seller_Id:req.params.seller_id});
    res.status(200).json(categories)
})

//NOTE - get a category and items by id
const getCategory=asyncHandler(async(req,res)=>{
    console.log(req.params.id);
    const category=await Category.findById(req.params.id);
    if(!category){
        res.status(404)
        throw new Error("Not found")
    }
    res.status(200).json(category)
  
})
//NOTE - create a category 
// route('/')
const createCategory=asyncHandler(async(req,res)=>{
 const {categoryname,item}=req.body;
 console.log(categoryname);
 if(!categoryname){
    res.status(401)
    throw new Error("categoryname Give mandatory")
 }
if(!item){
const newCategory=await Category.create({seller_Id:req.seller.id,categoryname});
res.status(200).json(newCategory);
}
else{
const newCategory=await Category(
    {categoryname,item}
)
const saveCategory=await newCategory.save()
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
const deleteCategory=asyncHandler(async(req,res)=>{
    const category=await Category.findById(req.params.id);
    if(!category){
        res.status(404)
        throw new Error("Not found")
    }
   await Category.deleteOne(category);
    res.status(200).json(category)
}

   
)

module.exports={getCategories,getCategory,createCategory,deleteCategory};