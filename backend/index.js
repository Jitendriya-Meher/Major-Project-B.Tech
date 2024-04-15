const express = require('express');
const app = express();

const cors = require('cors');

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json body
app.use(express.json());

// cors
app.use(cors());

// start server 
app.listen(PORT, () =>{
    console.log(`server started successfully at ${PORT}`);
})

//connect to the database
const dbConnect = require('./config/database');
dbConnect();


// import routes
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const productRoutes = require("./routes/product-routes");
const orderRoutes = require("./routes/order-routes");
const orderChatRoutes = require("./routes/order-chat-routes");
const contactRoute = require("./routes/contact-routes");

// mount routes
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/order/chat",orderChatRoutes);
app.use("/api/contact",contactRoute);


app.get('/',(req,res)=>{
    res.send(`<h1>Welcome To MERN Project Jitendriya !!!</h1>`)
})