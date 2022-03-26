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
        if(post && post.user.toString() === req.user.id) {
            post.remove()
            console.log('post deleted')
            await Comment.deleteMany({post: id})
            console.log('comments on post also deleted')
            return res.status(200).json({message: 'post deleted successfully'})
        } else {
            console.log('post not found or user id does not match')
            return res.status(401).json({message: 'post not found or user id does not match'})
        }
    } catch(err) {
        console.log('error in deleting post ', err)
        return res.status(401).json({message: 'ERROR'})
    }
}
