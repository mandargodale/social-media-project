const express = require('express')
const homeController = require('../controllers/home-controller')
const userRouter = require('./user-router')
const postRouter = require('./post-router')
const commentRouter = require('./comment-router')
const likeRouter = require('./like-router')

const router = express.Router()

//all root routes will be handled here
router.get('/', homeController.home)
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)
router.use('/like', likeRouter)

module.exports = router
