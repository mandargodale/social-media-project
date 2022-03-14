const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//telling password to use LocalStrategy for authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
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
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser()')
    return done(null, user.id)
})

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
