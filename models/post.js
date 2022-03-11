const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //a post belongs to an user
    //this relationship is establised here
    user: {
        type: mongoose.Schema.Types.ObjectId,  //this is of type ObjectIn in a document
        ref: 'User'  //this will refer to a document in users collection
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
