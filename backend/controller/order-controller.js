const { response } = require("express");
const OrderModal = require("../models/order-model");
const UserModel = require("../models/user-model");

require("dotenv").config();
const STRIP_KEY = process.env.STRIP_KEY || "";

const stripe = require('stripe')(STRIP_KEY);

const makePayment = async ( req, res) => {
    
    try{
        
        const {carts} = req.body;

        const lineItems = carts.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name,
                    images:[product.image]
                },
                unit_amount:product.newPrice * 100,
            },
            quantity:product.qnty
        }));
    
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel",
        })
    
        return res.json({
            id:session.id,
            message:"payment done",
            success:true
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const addOrder = async (req,res) => {
    try{

        const { userId} = req;
        const {carts, totalPrice, totalQnty} = req.body;

        const userData = await UserModel.findById( userId );

        const orderDB = await OrderModal.create({
            cart:carts,
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            address: userData.address,
            userId: userId,
            totalPrice,
            totalQnty
        });

        return res.json({
            success: true,
            message:"order place successfully",
            orderDB
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const getAllOrders = async (req,res) => {
    try{

        const { userId} = req;

        const orders = await OrderModal.find({
            userId: userId
        }).sort({
            createdAt: -1
        });

        return res.json({
            success: true,
            message:"orders fetch successfully",
            orders
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const getSingleOrders = async (req,res) => {
    try{

        const {id} = req.params;

        const order = await OrderModal.findById(id);

        return res.json({
            success: true,
            message:"order fetch successfully",
            order
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const editDelivery = async (req,res) => {
    try{

        const {id} = req.params;
        const {address,phone,email} = req.body;

        const order = await OrderModal.findByIdAndUpdate(id,{
            address,
            phone,
            email
        },{
            new: true
        });

        return res.json({
            success: true,
            message:"order edited successfully",
            order
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const deleteOrder = async (req,res) => {
    try{

        const {id} = req.params;

        const order = await OrderModal.findByIdAndDelete(id);

        return res.json({
            success: true,
            message:"order deleted successfully",
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const getOrders = async (req,res) => {
    try{

        const orders = await OrderModal.find({}).sort({
            createdAt: -1
        });

        return res.json({
            success: true,
            message:"orders fetch successfully",
            orders
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const updateOrder = async (req,res) => {
    try{

        const {id} = req.params;
        const {status} = req.body;

        const orders = await OrderModal.findByIdAndUpdate(id,{
            status: status 
        },{
            new: true
        });

        return res.json({
            success: true,
            message:"orders updated successfully",
            orders
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { addOrder,getAllOrders,getSingleOrders,editDelivery,deleteOrder, getOrders, updateOrder, makePayment};