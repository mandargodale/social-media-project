const mongoose = require('mongoose')

const schema = {
    user: {
        type: mongoose.Schema.ObjectId,
    },
    //object which is liked
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'  //dynamic reference
    },
    onModel: {
        type: String,
        required: true,
        enum: [
            'Post', 'Comment'  //object can be post or comment
        ]
    }
}

const likeSchema = new mongoose.Schema(schema, {timestamps: true})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
