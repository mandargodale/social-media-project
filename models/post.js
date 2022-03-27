const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //a post belongs to an user
    //this relationship is establised here
    //whenever a post is created, user property will be created whose value will be id of signed in user
    user: {
        type: mongoose.Schema.Types.ObjectId,  //this is of type ObjectIn in a document
        ref: 'User'  //this will refer to a document in users collection
    },
    //including id of all comments on the post
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    //including id of all likes on the post
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
