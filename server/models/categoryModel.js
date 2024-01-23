const mongoose=require('mongoose');

//SECTION - 
const itemSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true," Give  item name"]
        },
        description:{
                type:String,
                required:[true," Give item description"]
        },
        price:{
            type:Number,
            required:[true,"Give the item price"]
        },
        photo:{
                    type:String
        },
        photoType:{
                type:String
        },
        rating:{
            type:Number,
            default:0
        }
    },
    {
        timestamps:true
    }
)

//SECTION - 
const categorySchema=new mongoose.Schema(
    {
        seller_Id:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Seller"
        },
        categoryname:{
                type:String,
                required:[true,"categoryname mandatory"]
        },
        item:[itemSchema]
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Category",categorySchema)