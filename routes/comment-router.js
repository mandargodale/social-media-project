const express = require('express')
const commentController = require('../controllers/comment-controller')
const passport = require('passport')
const passportLocal = require('../config/passport-local-strategy')

const router = express.Router()

//checking if user is signed in before creating post
router.post('/create', passport.checkAuthentication, commentController.create)
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy)

module.exports = router
