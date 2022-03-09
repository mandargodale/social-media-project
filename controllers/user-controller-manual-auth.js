const User = require('../models/user')

//render profile page
module.exports.profile = (req, res) => {
    //MANUAL AUTHORIZATION
    //allow profile page only if signed in
    const {userId} = req.cookies
    //if user is sign in userId cookie will be set
    if(userId) {
        User.findById(userId, (err, user) => {
            if(err) {
                console.log('error in finding user')
                return res.redirect('/user/sign-in')
            }
            //if cookie is present i.e. user is signed in and user with userId is present
            if(user) {
                console.log('user found, going to profile')
                return res.render('profile.ejs', {title: 'Profile', user})
            }
        })
    } else {
        console.log('please sign in')
        return res.redirect('/user/sign-in')
    }
}

//render sign up page
module.exports.signUp = (req, res) => {
    return res.render('sign-up.ejs', {title: 'Sign Up'})
}

//render sign in page
module.exports.signIn = (req, res) => {
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
    //MANUAL AUTHENTICATION
    const {email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        //if error occurs in sign in, redirect to sign in page
        if(err) {
            console.log('error in finding user while signing in')
            return res.redirect('/user/sign-in')
        }
        //if user is found
        if(user) {
            //verifying password
            if(user.password !== password) {
                console.log('username or password does not match')
                return res.redirect('back')
            }
            //if password matches
            console.log('user found, redirecting to profile')
            //console.log('user.id = ', user.id)  //id from db collection
            res.cookie('userId', user.id)  //creating userId cookie and setting its value to user.id
            return res.redirect('/user/profile')
        } else {
            console.log('user not found, please sign up')
            return res.redirect('/user/sign-in')
        }
    })
}
