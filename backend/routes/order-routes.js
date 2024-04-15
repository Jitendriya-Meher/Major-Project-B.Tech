const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { addOrder, getAllOrders, getSingleOrders, editDelivery, deleteOrder, getOrders, updateOrder, makePayment } = require('../controller/order-controller');
const orderRoutes = express.Router();

orderRoutes.route("/add").post(authMiddleware,addOrder);
orderRoutes.route("/payment").post(makePayment);
orderRoutes.route("/user").get(authMiddleware,getAllOrders);
orderRoutes.route("/:id").get(authMiddleware,getSingleOrders);
orderRoutes.route("/edit/delivery/:id").patch(authMiddleware,editDelivery);
orderRoutes.route("/delete/:id").delete(authMiddleware,deleteOrder);
orderRoutes.route("/all/order").get(authMiddleware,getOrders);
orderRoutes.route("/:id").post(authMiddleware,updateOrder);

module.exports = orderRoutes;