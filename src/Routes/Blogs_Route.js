const express = require("express");
const router = express.Router()
const { 
    Add_Blogs_Controller,
    All_Blogs_Controller,
    Delete_Blog_Controller,
} = require("../Controllers/Blogs_Control");




router.post("/Create-Blog" , Add_Blogs_Controller);
router.get("/All-Blogs" , All_Blogs_Controller);
router.delete("/Del-Blog/:id" , Delete_Blog_Controller);


module.exports = router;