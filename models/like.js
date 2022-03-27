const mongoose = require('mongoose')

const schema = {
    user: {
        type: mongoose.Schema.ObjectId,
    },
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: [
            'Post', 'Comment'
        ]
    }
}

const likeSchema = new mongoose.Schema(schema, {timestamps: true})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
