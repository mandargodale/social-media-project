const User = require('../models/user')

module.exports.profile = (req, res) => {
    //authentication
    const {userId} = req.cookies
    if(userId) {
        User.findById(userId, (err, user) => {
            if(err) {
                console.log('error in finding user')
                res.redirect('/user/sign-in')
            }
            if(user) {
                console.log('user found, going to profile')
                res.render('profile.ejs', {title: 'Profile', user})
            }
        })
    } else {
        console.log('please sign in')
        res.redirect('/user/sign-in')
    }
}

//render the sign up page
module.exports.signUp = (req, res) => {
    res.render('sign-up.ejs', {title: 'Sign Up'})
}

//render the sign in page
module.exports.signIn = (req, res) => {
    res.render('sign-in.ejs', {title: 'Sign In'})
}

//get sign up form data and create user
module.exports.create = (req, res) => {
    //destructuring form data from req.body
    //req.body is created by express.urlencoded()
    const {name, email, password, confirmPassword} = req.body
    if(password !== confirmPassword) {
        console.log('password and confirm password do not match')
        res.redirect('back')
    }
    //if any error occurs, it will be stored in err
    //if the user is found with given email, it will be stored in user
    User.findOne({email: email}, (err, user) => {
        if(err) {
            console.log('error in finding if user already exists before signing up')
            res.redirect('/user/sign-up')
        }
        if(!user) {
            User.create({email, password, name}, (err, user) => {
                if(err) {
                    console.log('error in creating user while signing up')
                    res.redirect('/user/sign-up')
                }
                console.log('user created successfully')
                res.redirect('/user/sign-in')
            })
        }
        if(user) {
            //console.log('user = ', user)
            console.log('user is already registered')
            res.redirect('/user/sign-in')
        }
    })
}

//get sign in form data and create session for the user
module.exports.createSession = (req, res) => {
    const {email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(err) {
            console.log('error in finding user while signing in')
            res.redirect('/user/sign-in')
        }
        if(user) {
            if(user.password !== password) {
                console.log('username or password does not match')
                return res.redirect('back')
            }
            console.log('user found, redirecting to profile')
            //console.log('user.id = ', user.id)  //id from db collection
            res.cookie('userId', user.id)
            res.redirect('/user/profile')
        } else {
            console.log('user not found, please sign up')
            res.redirect('/user/sign-in')
        }
    })
}
