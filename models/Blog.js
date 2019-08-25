const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    public: {
        type: Boolean,
        default: false,
    },
    comments: [{  // comment: [{comment, commentBy}, {comment, commentBy}]
        comment: {
            type: String
        },
        commentBy: {
            type: String
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

