const express = require('express')
const likeController = require('../controllers/like-controller')

const router = express.Router()

router.post('/toggle-like', likeController.toggleLike)

module.exports = router
