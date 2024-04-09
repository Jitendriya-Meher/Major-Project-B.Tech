const mongoose = require('mongoose');

const productReviewModel = new mongoose.Schema({
    productId:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true,
        trim: true
    },
    userId:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        trim : true
    }
},{
    timestamps: true
});

const ProductReviewModel = mongoose.model("ProductReview",productReviewModel);

module.exports = ProductReviewModel;