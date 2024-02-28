const OtpModel = require("../models/otp-model");
const UserModel = require("../models/user-model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

// mail transporter
let transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user : process.env.MAIL_USER,
        pass : process.env.MAIL_PASS
    }
});


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
                message:"User already exists please log in",
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
            html: `<div style="background-color:yellow;padding:0.5rem ">
  
                    <p style="color:blue;text-align:center;font-size:2.5rem;font-weight:600;">
                    Welcome to the poject by Jikksss and Sam we heartily wecome your involvement into this projects exploration
                    </p>
                    
                    <p style="color:blue;text-align:center;font-size:2rem;font-weight:600;">Your Otp for Sign Up is : <i>${otp}</i> </p>
                    
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


const signUp = async (req,res) => {

    try{

        const { username, email, password , phone, address, otp } = req.body;

        if( !email || !password || !username || !phone || !address || !otp ){
            return res.json({
                message:"Please fill all required fields",
                success: false
            });
        }

        // check if user is already exist or not
        const existingUser = await UserModel.findOne({email});

        if( existingUser){
            return res.json({
                message:"User already exists please log in",
                success: false
            });
        }

        // Find the most recent OTP for the email
        const DbOtps = await OtpModel.find({
            email
        }).sort({
            createdAt: -1
        }).limit(1);

        if (DbOtps.length === 0) {

            // OTP not found for the email
            return res.json({
              success: false,
              message: "The OTP is not valid"
            });

        } else if (otp !== DbOtps[0].otp) {

            // Invalid OTP
            return res.json({
              success: false,
              message: "The OTP is not valid"
            });

        }

        // hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // create a user
        const newUser = await UserModel.create({
            username,
            password: hashPassword,
            address,
            phone,
            email
        });

        return res.json({
            success: true,
            message: "User SignIn Successfully",
            newUser
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}


const logIn = async (req, res) => {

    try{

        const { email, password } = req.body;

        if( !email || !password ){
            return res.json({
                message:"Please fill all required fields",
                success: false
            });
        }

        // check user exist or not
        const existingUser = await UserModel.findOne({email});

        if( !existingUser){
            return res.json({
                message:"Please sign up first",
                success: false
            });
        }

        // check password is correct or not
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

        if( !isCorrectPassword){
            return res.json({
                success: false,
                message: "Paswords do not match"
            });
        }

        const token = JWT.sign({
            id: existingUser.id
        }, process.env.JWT_SECRET_KEY);

        return res.json({
            success: true,
            message: "User Logged in successfully",
            existingUser,
            token
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
                message:"Please sign up first",
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
            html: `<div style="background-color:yellow;padding:0.5rem">
  
                    <p style="color:blue;text-align:center;font-size:2.5rem;font-weight:600;">
                    Welcom to Jiksss... & Sam work
                    </p>
                    
                    <p style="color:blue;text-align:center;font-size:2rem;font-weight:600;">Your Otp for reset password is : <i>${otp}</i> </p>
                    
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


const resetPassword = async ( req, res ) => {

    try{
        const { email, otp, newPassword } = req.body;

        const existingUser = await UserModel.findOne({
            email
        });

        if( !existingUser ){
            return res.json({
                message:"User not found please sign up first",
                success: false
            })
        }

        const DbOtps = await OtpModel.find({
            email
        }).sort({
            createdAt: -1
        }).limit(1);

        if (DbOtps.length === 0) {

            // OTP not found for the email
            return res.json({
              success: false,
              message: "The OTP is not valid"
            });

        } else if (otp !== DbOtps[0].otp) {

            // Invalid OTP
            return res.json({
              success: false,
              message: "The OTP is not valid"
            });
        }

        const hashPassword = await bcrypt.hash(newPassword,10);
        const id = existingUser._id;

        const updatedUser = await UserModel.findByIdAndUpdate(id,{
            password:hashPassword
        },{
            new:true
        });

        return res.json({
            message:"Password reset successfully",
            success:true,
            updatedUser
        });

    }
    catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }

} 

module.exports = { genetrateOTPSignup, signUp, generateOtpForgotonPassword, logIn , resetPassword};