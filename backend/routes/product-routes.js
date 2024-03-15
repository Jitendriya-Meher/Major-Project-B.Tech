const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const imageUpload = require('../config/multerConfig');
const { addProduct, getAllProducts, getSingleProduct } = require('../controller/product-controllers');
const productRoutes = express.Router();

productRoutes.route("/addproduct").post([authMiddleware,imageUpload.single("image")],addProduct);
productRoutes.route("/all").get(authMiddleware,getAllProducts);
productRoutes.route("/:id").get(authMiddleware,getSingleProduct);

module.exports = productRoutes;