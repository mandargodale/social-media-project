const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async (req, res) => {
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    })
}

module.exports.destroy = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        post.remove()
        console.log('post deleted')
        await Comment.deleteMany({post: id})
        console.log('comments on post also deleted')
        return res.status(200).json({
            message: 'post and associated comments deleted successfully'
        })
    } catch(err) {
        console.log('error in deleting post ', err)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
