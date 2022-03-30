const Post = require('../models/post')
const User = require('../models/user')
const config = require('../config/config')

/*module.exports.home = (req, res) => {
    Post.find({})
        //prepoluting posts with users document to display name of the user on post who created it
        .populate('user')  //this user referes to user property in postSchema
        //prepopulating posts with comments
        .populate({
            path: 'comments',
            //prepopulating comments with users
            populate: {
                path: 'user'
            }
        })
        .exec((err, posts) => {
            if(err) {
                console.log('error in fetching posts')
                return res.redirect('back')
            }
            console.log('posts fetched  successfully')
            User.find({}, (err, users) => {
                if(err) {
                    console.log('error in getting users')
                    return res.redirect('back')
                }
                return res.render('home.ejs', {title: 'Home', posts, allUsers: users})
            })
        })
    }*/
    
let postLimit = config.defaultPostLimit
module.exports.home = async (req, res,) => {
    //if request is from load button, then only load more posts
    if(req.xhr) {
        postLimit += config.noOfPostsToLoad
    }
    try {
        const posts = await Post.find({}).limit(postLimit)
            .sort('-createdAt')  //to display recent posts first
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes')
        const users = await User.find({})
        return res.render('home.ejs', {title: 'Home', posts, allUsers: users})
    } catch(err) {
        console.log('error in fetching posts and users ', err)
        return res.render('home.ejs', {title: 'Home', posts: [], allUsers: []})
    }
}
