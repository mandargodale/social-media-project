const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        console.log('created post')
        req.flash('success', 'post created successfully')
        return res.redirect('/')
    } catch(err) {
        req.flash('error', 'error in creating post')
        console.log('error in creating post')
        return res.redirect('/')
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(post && post.user.toString() === req.user.id) {
            post.remove()
            console.log('post deleted')
            await Comment.deleteMany({post: id})
            console.log('comment associated with post also deleted')
            req.flash('success', 'post deleted successfully')
            return res.redirect('back')
        } else {
            console.log('post not found or user id does not match')
            return res.redirect('back')
        }
    } catch(err) {
        console.log('error in deleting post ', err)
        req.flash('error', 'error in deleting post')
        return res.redirect('back')
    }
}
