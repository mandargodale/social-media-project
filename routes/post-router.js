const express = require('express')
const postController = require('../controllers/post-controller')
const passport = require('passport')
const passportLocal = require('../config/passport-local-strategy')

const router = express.Router()

//checking if user is signed in before creating post
router.post('/create', passport.checkAuthentication, postController.create)

module.exports = router
