const express = require("express");
const router = express.Router()
const {
    ActiveUser_Controller,
    TotalSignUps_Controller,
} = require("../Controllers/UserTracking_Contro");




router.get("/Active-User" , ActiveUser_Controller);
router.get("/Total_SignUps" , TotalSignUps_Controller);


module.exports = router;