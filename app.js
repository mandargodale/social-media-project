const express = require('express')
const router = require('./routes/router')
const port = require('./config/server-config')

const app = express()

app.use('/', router)

app.listen(port, () => console.log(`Server running on port ${port}...`))
