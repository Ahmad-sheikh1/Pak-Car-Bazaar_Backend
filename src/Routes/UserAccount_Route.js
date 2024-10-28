const express = require("express");
const router = express.Router()
const {
    SignUp_Controller,
    Login_Controller,
} = require("../Controllers/UserAccount_Contro");



router.post("/signup", SignUp_Controller);
router.post('/login' , Login_Controller)


module.exports = router;