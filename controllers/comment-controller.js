const Comment = require('../models/comment')
const Like = require('../models/like')
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

module.exports.destroy = (req, res) => {
    const {id} = req.params
    Comment.findById(id, async (err, comment) => {
        if(err) {
            console.log('error in deleting comment')
            return res.redirect('back')
        }
        if(comment && comment.user.toString() === req.user.id) {
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'})
            console.log('likes on comment deleted successfully')
            const postId = comment.post  //before deleting comment, take out postId to which comment is associated
            comment.remove()
            console.log('comment deleted successfully')
            //remove comment id from comments array in the post
            Post.findByIdAndUpdate(postId, {$pull: {comments: id}}, (err, post) => {
                if(err) {
                    console.log('error in updating comments array in post while deleting comment')
                    return res.redirect('back')
                }
                console.log('successfully updated comments array in post while deleting comment')
                return res.redirect('back')
            })
        } else {
            console.log('comment user and logged in user does not match')
            return res.redirect('back')
        }
    })
}