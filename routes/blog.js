const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');


//Reading Public Blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ public: true });

        res.send(blogs);
    } catch (err) {
        res.status(500).send(err);
    }
})


// Reading My Blogs
router.get('/myblogs', auth, async (req, res) => {
    try {
        const blogs = await Blog.find({
            owner: req.user._id
        })
        res.send(blogs);
    } catch (e) {
        res.send(e);
    }
})

// Creating Blog
router.post('/new', auth, async (req, res) => {
    try {
        const userId = req.user._id; // User ID who create the blog;
        const { title, subTitle, content, showToPublic } = req.body;
        const blogData = {
            title,
            subTitle,
            content,
            public: showToPublic,
            owner: userId
        }
        console.log(blogData);
        const blog = new Blog(blogData);
        await blog.save();
        res.send(blog);
    } catch (e) {
        res.send(e);
    }
})

//Adding Comment
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const { comment } = req.body;
        const blog = await Blog.findById({ _id: req.params.id })
        blog.comments.push({ comment, commentBy: req.user.name });
        await blog.save();
        res.send(blog);
    } catch (err) {
        res.send(err);
    }
})

// Deleting Blog
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.send('Deleted');
})


module.exports = router;