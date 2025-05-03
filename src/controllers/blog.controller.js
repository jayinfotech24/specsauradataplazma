import Blog from "../models/blog.model.js";
import { ERROR_MESSAGE } from "../constants/api.js";


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isDelete: false });

        res.status(200).json({ items: blogs, status: 200 });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: ERROR_MESSAGE.PROCESS_REQUEST })
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findOne({ _id:id, isDelete: false});

        if (blog) {
            res.status(200).json({ blog, status: 200 });
        } else {
            res.status(400).json({ message: "Blog not found", status: 400 });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: ERROR_MESSAGE.PROCESS_REQUEST })
    }
}

export const createBlog = async (req, res) => {
    try {

        const { url, title, description, writerName } = req.body;

        const blog = new Blog({
            url: url,
            title: title,
            description: description,
            writerName: writerName
        });

        await blog.save();

        if (blog) {
            res.status(200).json({ message: "Blog posted successfully", status: 200 });
        } else {
            res.status(400).json({ message: "Error creating Blog", status: 400 });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: ERROR_MESSAGE.PROCESS_REQUEST })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, title, description, writerName } = req.body;

        const blog = await Blog.findById(id);

        if (blog) {

            if (url) blog.url = url;
            if (title) blog.title = title;
            if (description) blog.description = description;
            if (writerName) blog.writerName = writerName;

            await blog.save();

            res.status(200).json({ message: "Blog Updated Succesfully", status: 200 });

        } else {
            res.status(400).json({ status: 400, message: ERROR_MESSAGE.ENTITY_NOT_FOUND });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: ERROR_MESSAGE.PROCESS_REQUEST });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (blog) {

            blog.isDelete = true

            await blog.save();

            res.status(200).json({ message: "Blog deleted successfully.", status: 200 });

        } else {
            res.status(400).json({ status: 400, message: ERROR_MESSAGE.ENTITY_NOT_FOUND });
        }

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}