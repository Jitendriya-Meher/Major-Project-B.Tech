const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const imageUpload = require('../config/multerConfig');
const { addProduct, getAllProducts, getSingleProduct, deleteProduct, editProduct } = require('../controller/product-controllers');
const { addProductReview, getProductAllReviews, deleteReview } = require('../controller/product-review-controllers');
const productRoutes = express.Router();

productRoutes.route("/addproduct").post([authMiddleware,imageUpload.single("image")],addProduct);
productRoutes.route("/all").get(authMiddleware,getAllProducts);
productRoutes.route("/:id").get(authMiddleware,getSingleProduct);
productRoutes.route("/delete/:id").delete(authMiddleware,deleteProduct);
productRoutes.route("/edit/:id").patch(authMiddleware,editProduct);

productRoutes.route("/addproductreview/:id").post(authMiddleware, addProductReview);
productRoutes.route("/getallreviews/:id").get(authMiddleware, getProductAllReviews);
productRoutes.route("/deletereview/:id").delete(authMiddleware, deleteReview);

module.exports = productRoutes;