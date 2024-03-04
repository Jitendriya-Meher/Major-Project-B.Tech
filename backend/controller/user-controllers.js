const OtpModel = require("../models/otp-model");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");

const editUser = async ( req ,res) => {

    try{
        const { userId} = req;
        const { username, email, address, phone} = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate({_id: userId},{
            username,
            email,
            address,
            phone
        },{
            new: true
        });

        if( !updatedUser){
            return res.json({
                message: "user not found",
                success: false
            });
        }

        return res.json({
            message: "User edited successfully",
            success: true,
            updatedUser
        });
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}

const editPassword = async ( req, res) => {

    try{
        const { userId } = req;
        const { oldPassword, password} = req.body;

        const existingUser = await UserModel.findById(userId);

        // compare old password and user existing password
        const isMatch = await bcrypt.compare(oldPassword, existingUser.password);

        if( !isMatch ){
            return res.json({
                message: "Old Password does not match",
                success: false
            });
        }

        // hash the password
        const hashPassword = await bcrypt.hash( password, 10);

        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            password: hashPassword
        },{
            new: true 
        });

        if( !updatedUser){
            return res.json({
                message: "user not found",
                success: false
            });
        }

        return res.json({
            message: "Password updated successfully",
            success: true,
            updatedUser
        });

    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }
}


const deleteUser = async ( req, res) => {

    try{
        const { userId } = req;

        const { password} = req.body;

        const existingUser = await UserModel.findById(userId);

        if( !existingUser){
            return res.json({
                message:"User not found with this token",
                success: false
            });
        }

        // check the password is correct or not
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if( !isMatch ){
            return res.json({
                message:"Please enter your correct password",
                success: false
            });
        }

        const delUser = await UserModel.findByIdAndDelete(userId);

        if( !delUser){
            return res.json({
                message: "user not found",
                success: false,
            });
        }

        // also delete the user opts
        const delOtps = await OtpModel.deleteMany({
            email: delUser.email
        });

        return res.json({
            message: 'User deleted successfully',
            success: true,
            delUser,
            delOtps
        });

    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        });
    }

}

module.exports = { editUser, editPassword, deleteUser };