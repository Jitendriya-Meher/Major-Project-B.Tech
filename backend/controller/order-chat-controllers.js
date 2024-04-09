const OrderChat = require("../models/order-chat");

const addOrderChat = async ( req,res) =>{
    try{
        const {id} = req.params;
        const {message,username,isAdminChat} = req.body;

        const chat = await OrderChat.create({
            orderId: id,
            message,
            username,
            isAdminChat
        });

        return res.json({
            success: true,
            message:"message send successfully",
            chat
        });

    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const getAllOrderChats = async ( req,res) =>{
    try{
        const {id} = req.params;

        const chats = await OrderChat.find({
            orderId: id
        }).sort({
            createdAt:-1
        });

        return res.json({
            success: true,
            message:"message fetched successfully",
            chats
        });
        
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { addOrderChat, getAllOrderChats};