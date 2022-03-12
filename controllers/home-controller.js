const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = (req, res) => {
    Post.find({})
        //prepoluting posts with users document to display name of the user on post who created it
        .populate('user')  //this user referes to user property in post document
        .exec((err, posts) => {
            if(err) {
                console.log('error is fetching posts')
                return
            }
            console.log('posts fetched  successfully')
            return res.render('home.ejs', {title: 'Home', posts})
        })
}
