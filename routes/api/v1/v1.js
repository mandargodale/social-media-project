const express = require('express')
const post = require('./post')
const user = require('./user')

const router = express.Router()

router.use('/post', post)
router.use('/user', user)

module.exports = router
