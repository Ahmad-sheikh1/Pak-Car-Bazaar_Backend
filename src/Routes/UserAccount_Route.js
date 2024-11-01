const express = require("express");
const router = express.Router()
const {
    SignUp_Controller,
    Login_Controller,
    Admin_Signup_Controller,
    Admin_Login_Controller,
} = require("../Controllers/UserAccount_Contro");



router.post("/signup", SignUp_Controller);
router.post('/login' , Login_Controller);
router.post('/admin/signup' , Admin_Signup_Controller);
router.post('/admin/login' , Admin_Login_Controller)


module.exports = router;