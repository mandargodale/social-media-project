const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//we want to find user by email id
//passport uses value of name attribute in form to find the user
//default value of name attribute in passport is username but we have email as value of name attribute
//so setting usernameField to email to tell passport to use email instead of username
const passportOptions = {
    usernameField: 'email',
    passReqToCallback: true
}

const verifyCallback = (req, email, password, done) => {
    //find the user using email and establish the identity
    User.findOne({email: email}, (err, user) => {
        if(err) {
            console.log('error in finding user, from passport in use()')
            req.flash('error', 'error in finding user')
            return done(err)
        }
        if(!user) {
            console.log('user not found, from passport in use()')
            req.flash('error', 'user not found')
            return done(null, false)
        }
        if(user.password !== password) {
            console.log('incorrect username or password, from passport in use()')
            req.flash('error', 'incorrect username or password')
            return done(null, false)
        }
        //if no error occured, user found and password matched, pass user to done()
        return done(null, user)  //null => no error
    })
}

const localStrategy = new LocalStrategy(passportOptions, verifyCallback)

//telling password to use localStrategy for authentication
passport.use(localStrategy)

//after verifyCallback(), passport call this
//it receives user from verifyCallback(), using this it adds user id in the session cookie
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser()')
    return done(null, user.id)
})

//after serializeUser(), passport call this
//it finds user by id and stores it in req.user
passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser()')
    User.findById(id, (err, user) => {
        if(err) {
            console.log('error in finding user, from passport in deserializeUser()')
            return done(err)
        }
        console.log('user found, from passport in deserializeUser()')
        return done(null, user)
    })
})

//craeting a middleware in passport object to check if user is authenticated
//this is not built in method, we are adding it to passport object
passport.checkAuthentication = (req, res, next) => {
    //passport adds isAuthenticated() method inside req
    if(req.isAuthenticated()) {
        //if user is authenticated, call next function or middleware
        //next function will be nothing but controller
        return next()
    }
    return res.redirect('/user/sign-in')
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        //passport adds current user to req
        //creating user property in res.locals and assigning req.user to it
        res.locals.user = req.user
    }
    //this will call next function or middleware
    //next function will be nothing but controller
    next()
}

module.exports = passport
