const express = require("express");
const router = express.Router()
const {
    Add_Blogs_Controller,
    All_Blogs_Controller,
    Delete_Blog_Controller,
    Update_Blog_Controller,
} = require("../Controllers/Blogs_Control");
const checkBlockStatus = require("../Middlewares/CheckBlockStatus.Middleware");
const VerifyRequest = require("../Middlewares/Auth_Middleware");



router.post("/Create-Blog", VerifyRequest, checkBlockStatus, Add_Blogs_Controller);
router.get("/All-Blogs", VerifyRequest, checkBlockStatus, All_Blogs_Controller);
router.delete("/Del-Blog/:id", VerifyRequest, checkBlockStatus, Delete_Blog_Controller);
router.put("/UpdateBlog/:id", VerifyRequest, checkBlockStatus, Update_Blog_Controller)


module.exports = router;