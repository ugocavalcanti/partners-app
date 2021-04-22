const express = require("express");
const dotenv = require("dotenv");
const routerPartner = require("./router/partnerRouter");
const connectDB = require("./db");

const app = express();;

dotenv.config({path: ".env"});

connectDB();
app.use(express.json());
app.use("/partner", routerPartner);


module.exports = app;