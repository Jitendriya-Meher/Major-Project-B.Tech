const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    oldPrice:{
        type:Number,
        required:true,
    },
    newPrice:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    qunatityRemaining:{
        type:Number,
        required:true,
    },
    qnty:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

const ProductModel = mongoose.model("Product",ProductSchema);

module.exports = ProductModel;