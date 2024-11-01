const express = require("express");
const router = express.Router()
const {
    Create_Sell_Car_Controller,
} = require("../Controllers/SellCar_Controller");
const VerifyRequest = require("../Middlewares/Auth_Middleware");
const checkBlockStatus = require("../Middlewares/CheckBlockStatus.Middleware");



router.post("/Create", VerifyRequest, checkBlockStatus, Create_Sell_Car_Controller);


module.exports = router;
