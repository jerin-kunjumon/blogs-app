const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Author is required"]
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Blog', blogSchema);