const express = require('express')
const post = require('../../../controllers/api/v1/post')

const router = express.Router()

router.get('/posts', post.index)
router.delete('/:id', post.destroy)

module.exports = router
