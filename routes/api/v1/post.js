const express = require('express')
const postApi = require('../../../controllers/api/v1/post-api')

const router = express.Router()

router.get('/', postApi.index)

module.exports = router
