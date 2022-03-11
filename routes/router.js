const express = require('express')
const homeController = require('../controllers/home-controller')
const userRouter = require('./user-router')
const postRouter = require('./post-router')

const router = express.Router()

//all root routes will be handled here
router.get('/', homeController.home)
router.use('/user', userRouter)
router.use('/post', postRouter)

module.exports = router
