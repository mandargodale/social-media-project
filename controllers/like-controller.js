const Like = require('../models/like')
const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.toggleLike  = async (req, res) => {
    try {
        let likeable
        let deleted = false
        const {id, type} = req.query
        const userId = req.user._id
        if(type.toLowerCase() === 'post') {
            likeable = await Post.findById(id).populate('likes')
        } else {
            likeable = await Comment.findById(id).populate('likes')
        }
        // likeable = type.toLowerCase() === 'post'
        // ? await Post.findById(id).populate('likes')
        // : await Comment.findById(id).populate('likes')

        let existingLike = await Like.findOne({
            likeable: id,
            onModel: type,
            user: userId
        })
        if(existingLike) {
            likeable.likes.pull(existingLike._id)
            likeable.save()
            existingLike.remove()
            deleted = true
            return res.redirect('back')
        } else {
            const newLike = await Like.create({
                user: userId,
                likeable: id,
                onModel: type
            })
            likeable.likes.push(newLike._id)
            likeable.save()
            // return res.status(200).json({
            //     message: 'toggle like successfull',
            //     data: {
            //         deleted: deleted
            //     }
            // })
            return res.redirect('back')
        }
    } catch(err) {
        console.log('error in liking ', err)
        return res.status(500).json({message: 'error in liking'})
    }
}