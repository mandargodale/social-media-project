const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')

const passportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt'
}

const verifyCallback = async (payload, done) => {
    try {
        const user = await User.findById(payload._id)
        if(user) {
            return done(null, user)
        }
        return done(null, false)
    } catch(err) {
        console.log('err = ', err)
        return
    }
}

const jwtStrategy = new JwtStrategy(passportOptions, verifyCallback)

passport.use(jwtStrategy)

module.exports = passport
