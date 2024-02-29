const OtpModel = require("../models/otp-model");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

require("dotenv").config();


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
                message:"User already exists with this email, please log in",
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
                message:"User not found with this email, please sign up first",
                success: false
            });
        }

        // check password is correct or not
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

        if( !isCorrectPassword){
            return res.json({
                success: false,
                message: "Please enter correct password"
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


const resetPassword = async ( req, res ) => {

    try{
        const { email, otp, newPassword } = req.body;

        const existingUser = await UserModel.findOne({
            email
        });

        if( !existingUser ){
            return res.json({
                message:"User not found with this email, please sign up first",
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


module.exports = { signUp, logIn , resetPassword};