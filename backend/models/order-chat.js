const mongoose = require('mongoose');

const orderChat = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    isAdminChat:{
        type:Boolean,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps: true
});

const OrderChat = mongoose.model("OrderChat",orderChat);

module.exports = OrderChat;