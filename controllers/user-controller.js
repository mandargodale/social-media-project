const User = require('../models/user')
const passport = require('passport')
const path = require('path')
const fs = require('fs')
const Post = require('../models/post')

//render profile page
module.exports.profile = async (req, res) => {
    //getting id from params, finding the user and passing it to locals
    const {id} = req.params
    const user = await User.findById(id)
    const posts = await Post.find({user: id})
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
    return res.render('profile.ejs', {title: 'Profile', posts, profileUser: user})
}

//render sign up page
module.exports.signUp = (req, res) => {
    //if user is signed in, redirect to profile
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    return res.render('sign-up.ejs', {title: 'Sign Up'})
}

//render sign in page
module.exports.signIn = (req, res) => {
    //if user is signed in, redirect to profile
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    return res.render('sign-in.ejs', {title: 'Sign In'})
}

//get sign up form data and create user
module.exports.create = (req, res) => {
    //destructuring form data from req.body
    //req.body is created by express.urlencoded()
    const {name, email, password, confirmPassword} = req.body
    if(password !== confirmPassword) {
        console.log('password and confirm password do not match')
        return res.redirect('/user/sign-up')
    }

    //if any error occurs, it will be stored in err
    //if the user is found with given email, it will be stored in user
    User.findOne({email: email}, (err, user) => {
        //if error occurs in sign up, redirect to sign up page
        if(err) {
            console.log('error in finding if user already exists before signing up')
            return res.redirect('/user/sign-up')
        }
        //if user is not found i.e. user is not registered
        if(!user) {
            User.create({email, password, name}, (err, user) => {
                if(err) {
                    console.log('error in creating user while signing up')
                    return res.redirect('/user/sign-up')
                }
                console.log('user created successfully')
                return res.redirect('/user/sign-in')
            })
        }
        //if user is found i.e. it is already registered
        if(user) {
            //console.log('user = ', user)
            console.log('user is already registered')
            return res.redirect('/user/sign-in')
        }
    })
}

//get sign in form data and create session for the user
module.exports.createSession = (req, res) => {
    console.log('session created, redirecting to home')
    //connect-flash has added flash() in req
    req.flash('success', 'Signed in successfully')
    //console.log(`req.flash('success') = `, req.flash('success'))  //[ 'Signed in successfully' ]
    return res.redirect('/')
}

//get sign out
module.exports.destroySession = (req, res) => {
    console.log('session destroyed, redirecting to home')
    req.flash('success', 'Signed out successfully')
    //passport has added logout() in req
    req.logout()
    return res.redirect('/')
}

/* module.exports.update = (req, res) => {
    const {name, email} = req.body
    const {id} = req.params
    //checking if logged in user id and user id from params is matching
    if(req.user.id === id) {
        User.findByIdAndUpdate(id, {name, email}, (err, updatedUser) => {
            if(err) {
                console.log('error in updating user')
                return res.redirect('back')
            }
            console.log('user updated successfully')
            return res.redirect('back')
        })
    } else {
        console.log('invalid user in update()')
        res.status(401).redirect('Unauthorized')

    }
    console.log(name, email, id)
} */

module.exports.update = async (req, res) => {
    const {name, email} = req.body
    const {id} = req.params
    //checking if logged in user id and user id from params is matching
    if(req.user.id === id) {
        try {
            const user = await User.findByIdAndUpdate(id)
            User.uploadedProfilePicture(req, res, (err) => {
                if(err) {
                    console.log('multer error in updating profile ', err)
                    return res.redirect('back')
                }
                const {name, email} = req.body
                user.name = name
                user.email = email
                if(req.file) {
                    //check if profilePicture is present and the file is present before deleting
                    if(user.profilePicture && fs.existsSync(user.profilePicture)) {
                        fs.unlinkSync(path.join(__dirname, '..', user.profilePicture))
                    }
                    //User.profilePicturePath = uploads\user\profile-pictures, this is coming statics
                    //req.file.filename = profilePicture-number1-number2, this is from multer.diskStorage()
                    user.profilePicture = path.join(User.profilePicturePath, req.file.filename)
                }
                user.save()
                return res.redirect('back')
            })
        } catch(err) {
            console.log('error in updating profile ', err)
            req.flash('error', 'error in updating profile')
            return res.redirect('back')
        }
    } else {
        console.log('invalid user in update()')
        res.status(401).redirect('Unauthorized')
    }
    console.log(name, email, id)
}
