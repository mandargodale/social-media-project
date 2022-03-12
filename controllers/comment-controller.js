const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = (req, res) => {
    const {postId, content} = req.body
    const {_id} = req.user._id

    //first finding post by if which we are passing from hidden input
    Post.findById(postId, (err, post) => {
        if(err) {
            console.log('error in adding comment since error in finding corresponding post')
            return
        }
        //if post is found
        if(post) {
            //create comment, add content, post id and user id in the comment document
            Comment.create({
                content: content,
                post: postId,
                user: _id
            }, (err, comment) => {
                if(err) {
                    console.log('error in creating comment')
                    return
                }
                //if comment is created successfully, update comments array in post with comment id
                post.comments.push(comment)
                post.save()
                res.redirect('/')
            })
        }
    })
}