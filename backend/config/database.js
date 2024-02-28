
const mongoose = require('mongoose');
// import mongoose from 'mongoose';

require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

const dbConnect = () => {

    try{
        mongoose.connect( process.env.DATABASE_URL);
        console.log("DB connection established");
    }
    catch(err){
        console.log("Error connecting to DB", err.message);
    }
};

module.exports = dbConnect;
// export default dbConnect;