const ProductReviewModel = require("../models/product-review-model");

const addProductReview = async ( req, res) => {

    try{
        const { userId, username} = req;
        const { review } = req.body;
        const { id } = req.params;  

        const reviewDB   = await ProductReviewModel.create({
            review,
            username,
            userId,
            productId:id
        });

        return res.json({
            message: "Product review added successfully",
            success: true,
            reviewDB
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }

}

const getProductAllReviews = async ( req, res) => {

    try{
        const { id } = req.params;  

        const reviews   = await ProductReviewModel.find({
            productId: id
        });

        return res.json({
            message: "Product review fetched successfully",
            success: true,
            reviews
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }

}

const deleteReview = async ( req, res) => {

    try{
        const { id } = req.params;  

        const review   = await ProductReviewModel.deleteOne({
            productId: id
        });

        return res.json({
            message: "Product review deleted successfully",
            success: true,
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }

}

module.exports = { addProductReview, getProductAllReviews, deleteReview};