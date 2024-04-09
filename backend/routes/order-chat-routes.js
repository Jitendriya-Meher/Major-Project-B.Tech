const express = require("express");
const { addOrderChat, getAllOrderChats } = require("../controller/order-chat-controllers");
const { authMiddleware } = require("../middlewares/auth-middleware");
const orderChatRoutes = express.Router();

orderChatRoutes.route("/add/:id").post(authMiddleware,addOrderChat);
orderChatRoutes.route("/all/:id").get(authMiddleware,getAllOrderChats);

module.exports = orderChatRoutes;