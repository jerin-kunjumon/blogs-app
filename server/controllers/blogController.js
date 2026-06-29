const Blog = require('../models/Blog');
const ApiError = require('../utils/ApiError');

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: blogs
        });
    } catch (error) {
        next(error);
    }
};

const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');

        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

const createBlog = async (req, res, next) => {
try {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Please provide title and content");
    }

    const blog = await Blog.create({
        title,
        content,
        author: req.user.id
    });

    res.status(201).json({
        success: true,
        data: blog
    });
} catch (error) {
    next(error);
}
}

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        if(blog.author.toString() !== req.user.id) {
            throw new ApiError(403, "You are not authorized to update this blog");
        }

        const { title, content } = req.body;

       if(title) blog.title = title;
       if(content) blog.content = content;

       await blog.save();

       await blog.populate('author', 'name email');

       res.status(200).json({
        success: true,
        data: blog
       });
    } catch (error) {
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);    

        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        if(blog.author.toString() !== req.user.id) {
            throw new ApiError(403, "You are not authorized to delete this blog");
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};