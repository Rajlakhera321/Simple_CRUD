const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_connect,
    {useUnifiedTopology: true, useNewUrlParser: true},
    ()=>console.log("Connected to DB")
);

app.use(express.json());

const productRouter = require("./routes/product");

app.use("/api/products",productRouter);

app.listen(3000,()=>{console.log("Server up and running on port 3000")});