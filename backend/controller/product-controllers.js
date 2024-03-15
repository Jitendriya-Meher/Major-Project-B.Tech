const cloudinary = require("../config/cloudinaryConfig");
const ProductModel = require("../models/product-model");

const addProduct = async ( req,res) => {
    try{
        const file = req?.file ? req?.file?.path : "";
        const { name,
        description,
        oldPrice,
        newPrice,
        category,
        quantity} = req.body;

        if( !file || !name || !description || !oldPrice || !newPrice || !category || !quantity ){
            return res.json({
                message: "Please enter all required fields",
                success: false
            });
        }

        const upload = await cloudinary?.uploader?.upload(file);

        const productData = await ProductModel.create({
            name,
            image:upload?.secure_url,
            description,
            oldPrice,
            newPrice,
            qunatityRemaining:quantity,
            category
        });

        return res.json({
            message:"Product added successfully",
            success:true,
            productData
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const getAllProducts = async (req, res) => {
    try{
        const allProducts = await ProductModel.find({});

        return res.json({
            message:"Products fetch successfully",
            success: true,
            allProducts
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const getSingleProduct = async (req, res) => {
    try{
        const { id} = req.params;

        const product = await ProductModel.findById(id);

        return res.json({
            message:"Product fetch successfully",
            success: true,
            product
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { addProduct , getAllProducts, getSingleProduct};