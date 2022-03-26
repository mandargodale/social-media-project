const express = require('express')
const post = require('../../../controllers/api/v1/post')
const passport = require('passport')

const router = express.Router()

router.get('/posts', post.index)
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), post.destroy)

module.exports = router
