const CatchAsync = require("../Utils/CatchAsync");
const Blogs = require("../Models/Blogs");



const Add_Blogs_Controller = CatchAsync(async (req, res, next) => {

    const { title, content, author } = req.body;

    if (!title, !content, !author) {
        throw new AppError('All Fields are required', 400);
    }

    const NewBlog = await Blogs.create({
        title,
        content,
        author
    });

    res.status(200).json({ success: true, NewBlog })

});

const All_Blogs_Controller = CatchAsync(async (req, res, next) => {

    const blogs = await Blogs.find();

    res.status(200).json({blogs})

});

const Delete_Blog_Controller = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const blog = await Blogs.findByIdAndDelete(id);

    if (!blog) {
        return next(new AppError('Blog not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Blog deleted successfully',
    });
});

module.exports = {
    Add_Blogs_Controller,
    All_Blogs_Controller,
    Delete_Blog_Controller,
}