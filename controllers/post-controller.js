const Post = require('../models/post')
const Comment = require('../models/comment')

/* module.exports.create = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id  //whenever a post is created, user property will be created whose value will be id of signed in user
    }, (err) => {
        if(err) {
            console.log('error in creating post')
            return
        }
        console.log('created post')
        return res.redirect('back')
    })
} */

/* module.exports.create = async (req, res) => {
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
} */

module.exports.create = async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        //AJAX request is of type XMLHttpRequest
        //so if the req is from js/post.js/createPost(), req.xhr will be true
        if(post && req.xhr) {
            console.log('created post')
            req.flash('success', 'post created successfully')
            return res.status(200).json({
                data: {post: post},
                message: 'post created successfully'
            })
        }
    } catch(err) {
        req.flash('error', 'error in creating post')
        console.log('error in creating post')
        return res.redirect('/')
    }
}

/* module.exports.destroy = (req, res) => {
    //getting id from params
    const {id} = req.params
    Post.findById(id, (err, post) => {
        //post.user.toString() => converting ObjectId to string
        //req.user.id => this is string version of req.user._id
        if(post && post.user.toString() === req.user.id) {
            post.remove()
            Comment.deleteMany({post: id}, (err) => {
                if(err) {
                    console.log('error in deleting comment')
                    return res.redirect('back')
                }
                console.log('post deleted')
                return res.redirect('back')
            })
        } else {
            console.log('temp123')
            return res.redirect('back')
        }
    })
} */

/* module.exports.destroy = async (req, res) => {
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
} */

module.exports.destroy = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(post && post.user.toString() === req.user.id) {
            post.remove()
            console.log('post deleted')
            await Comment.deleteMany({post: id})
            if(req.xhr) {
                console.log('comment associated with post also deleted')
                req.flash('success', 'post deleted successfully')
                return res.status(200).json({
                    data: {post_id: id},
                    message: 'comment associated with post also deleted'
                })
            }
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
