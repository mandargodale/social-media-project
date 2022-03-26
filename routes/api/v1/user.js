const express = require('express')
const user = require('../../../controllers/api/v1/user')

const router = express.Router()

router.post('/create-session', user.createSession)

module.exports = router
