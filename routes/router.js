const express = require('express')
const homeController = require('../controllers/home-controller')
const userRouter = require('./user-router')

const router = express.Router()

router.get('/', homeController)
router.use('/user', userRouter)

module.exports = router
