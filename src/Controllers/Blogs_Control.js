const CatchAsync = require("../Utils/CatchAsync");
const Blogs = require("../Models/Blogs");
const mongoose = require("mongoose");


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

    res.status(200).json({ blogs })

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

const Update_Blog_Controller = CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid blog ID.' });
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(
        id,
        { $set: { title, content, author } },
        { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found.' });
    }

    res.status(200).json({
        message: 'Blog updated successfully.',
        data: updatedBlog
    });
});

module.exports = {
    Add_Blogs_Controller,
    All_Blogs_Controller,
    Delete_Blog_Controller,
    Update_Blog_Controller,
}