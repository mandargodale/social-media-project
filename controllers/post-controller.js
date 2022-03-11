const Post = require('../models/post')

module.exports.create = (req, res, next) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, (err) => {
        if(err) {
            console.log('error in creating post')
            return
        }
        console.log('created post')
        return res.redirect('back')
    })
}
