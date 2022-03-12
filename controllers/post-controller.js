const Post = require('../models/post')

module.exports.create = (req, res, next) => {
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
}
