const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = async ( req, res, next ) => {

    try{
        const token = req.headers.authorization;

        if( !token){
            return res.json({
                success:false,
                message: "token doesnot provide for authorization"
            });
        }

        const isVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const userData = await UserModel.findOne({
            _id:isVerified.id
        }).select({
            password:0
        });

        if( !userData){
            return res.json({
                message: "user not found with this token",
                success: false
            });
        }
        
        req.userId = userData._id;
        req.username = userData.username;

        next();
        
    }
    catch( err ){
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {authMiddleware};