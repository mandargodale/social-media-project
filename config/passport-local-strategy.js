const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    //find the user and establish the identity
    User.findOne({email: email}, (err, user) => {
        if(err) {
            console.log('error in finding user, from passport')
            return done(err)
        }
        if(!user) {
            console.log('user not found, from passport')
            return done(null, false)
        }
        if(user.password !== password) {
            console.log('incorrect username or password, from passport')
            return done(null, false)
        }
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser()')
    done(null, user.id)
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

module.exports = passport
