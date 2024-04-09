const mongoose = require('mongoose');

const orderModal = new mongoose.Schema({
    cart:[],
    userId:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        trim : true
    },
    phone:{
        type: String,
        required: true,
        trim : true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    totalPrice:{
        type:String,
        required:true,
        trim:true
    },
    totalQnty:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:"Order Placed",
        trim:true
    }
},{
    timestamps: true
});

const OrderModal = mongoose.model("OrderModal",orderModal);

module.exports = OrderModal;