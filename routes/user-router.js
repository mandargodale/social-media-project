const express = require('express')
//const userController = require('../controllers/user-controller-manual-auth')
const userController = require('../controllers/user-controller')
const passport = require('passport')
const passportLocal = require('../config/passport-local-strategy')

const router = express.Router()
router.get('/profile/:id', passport.checkAuthentication, userController.profile)
router.get('/sign-up', userController.signUp)
router.get('/sign-in', userController.signIn)
router.post('/create', userController.create)
router.post('/update-profile/:id', userController.update)

// router.post('/create-session', userController.createSession)
//using passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
), userController.createSession)

router.get('/sign-out', userController.destroySession)

module.exports = router
