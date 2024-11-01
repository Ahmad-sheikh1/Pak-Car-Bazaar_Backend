const express = require("express");
const router = express.Router();
const {
    Block_User_Controller,
    UnBlock_User_Controller,
    Estimation_Price_Controller,
    Sell_Car_Count_Controller,
} = require("../Controllers/AdminControl_Contro");
const checkAdmin = require("../Middlewares/CheckAdmin_Middleware");
const VerifyRequest = require("../Middlewares/Auth_Middleware");



router.patch("/block/:id", VerifyRequest, checkAdmin, Block_User_Controller)
router.patch("/unblock/:id", VerifyRequest, checkAdmin, UnBlock_User_Controller)
router.post("/estimation-price", VerifyRequest, checkAdmin, Estimation_Price_Controller)
router.get("/Sell_Car_Count"  , Sell_Car_Count_Controller)


module.exports = router;