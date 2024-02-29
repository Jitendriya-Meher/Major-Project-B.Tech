const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const UserModel = require("../models/user-model");
const OtpModel = require("../models/otp-model");

require("dotenv").config();

// mail transporter
let transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user : process.env.MAIL_USER,
        pass : process.env.MAIL_PASS
    }
});
const projectName = "Ecommerce JS";


const genetrateOTPSignup = async (req, res) => {

    try{    

        const { email, username } = req.body;

        if( !email || !username ){
            return res.json({
                message:"Please fill all required fields",
                success: false
            });
        }

        //  check if user is already exis or not
        const existingUser = await UserModel.findOne({email: email});

        if( existingUser){
            return res.json({
                message:"User already exists with this email, please log in",
                success: false
            });
        }

        // create an otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const otpPayload = await OtpModel.create({
            email,
            otp
        });

        const info = await transporter.sendMail({
            from: "jitenkvk@gmail.com", // sender address
            to: email, // list of receivers
            subject: "new opt generated", // Subject line
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${projectName}</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing ${projectName}. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br /><p>${projectName}</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Ecommerce JS Inc</p>
                        <p>Maruti Nagar</p>
                        <p>Khariar</p>
                    </div>
                    </div>
                </div>`, // html body
        });

        return res.json({
            success: true,
            message: `OPT has been send to your email ${username}`,
            otpPayload
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}


const generateOtpForgotonPassword = async (req, res) => {

    try{    

        const { email } = req.body;

        if( !email ){
            return res.json({
                message:"Please fill all required fields",
                success: false
            });
        }

        //  check if user is already exis or not
        const existingUser = await UserModel.findOne({email: email});

        if( !existingUser){
            return res.json({
                message:"User not found with this email, please sign up first",
                success: false
            });
        }

        // create an otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const otpPayload = await OtpModel.create({
            email,
            otp
        });

        const info = await transporter.sendMail({
            from: "jitenkvk@gmail.com", // sender address
            to: email, // list of receivers
            subject: "new opt generated", // Subject line
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                        <div style="margin:50px auto;width:70%;padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${projectName}</a>
                        </div>
                        <p style="font-size:1.1em">Hi,</p>
                        <p>Thank you for choosing ${projectName}. Use the following OTP to complete your Reset Password procedures. OTP is valid for 5 minutes</p>
                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                        <p style="font-size:0.9em;">Regards,<br /><p>${projectName}</p>
                        <hr style="border:none;border-top:1px solid #eee" />
                        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                            <p>${projectName} Inc</p>
                            <p>Maruti Nagar</p>
                            <p>Khariar</p>
                        </div>
                        </div>
                    </div>`, // html body   
        });

        return res.json({
            success: true,
            message: `OPT has been send to your email`,
            otpPayload
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { genetrateOTPSignup, generateOtpForgotonPassword};