const express = require("express");
const router = express.Router()
const {
    ActiveUser_Controller,
    TotalSignUps_Controller,
} = require("../Controllers/UserTracking_Contro");
const checkAdmin = require("../Middlewares/CheckAdmin_Middleware");
const VerifyRequest = require("../Middlewares/Auth_Middleware");



router.get("/Active-User", VerifyRequest, checkAdmin, ActiveUser_Controller);
router.get("/Total_SignUps", VerifyRequest, checkAdmin, TotalSignUps_Controller);


module.exports = router;