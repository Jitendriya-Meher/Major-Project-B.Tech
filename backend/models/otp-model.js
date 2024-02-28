const mongoose = require('mongoose');

const otpModel = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        default:"",
        trim:true
    }
},{
    timestamps: true
});

const OtpModel = mongoose.model("Otp",otpModel);

module.exports = OtpModel;