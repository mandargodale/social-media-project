const express = require('express')
const router = require('./routes/router')
const port = require('./config/server-config')

const app = express()

//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/', router)

app.listen(port, () => console.log(`Server running on port ${port}...`))
