const express = require('express')
const userController = require('../controllers/user-controller')

const router = express.Router()

router.get('/profile', userController.profile)
router.get('/sign-up', userController.signUp)
router.get('/sign-in', userController.signIn)
router.post('/create', userController.create)
router.post('/create-session', userController.createSession)

module.exports = router
