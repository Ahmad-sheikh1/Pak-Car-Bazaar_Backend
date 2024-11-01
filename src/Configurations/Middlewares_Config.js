require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const VerifyRequest = require("../Middlewares/Auth_Middleware");
const cookieParser = require("cookie-parser"); 
const checkBlockStatus = require("../Middlewares/CheckBlockStatus.Middleware");

module.exports = function (app) {

    app.use(cors())

    app.use(helmet({ contentSecurityPolicy: false }));

    const limiter = rateLimit({
        max: 90000,
        windowMs: 15 * 60 * 1000, // 15 minutes
        message: "Too many requests from this IP, please try again in 15 mintues!"
    })

    app.use("/api", limiter)

    app.use(express.json());

    app.use(cookieParser());


}