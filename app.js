const express = require('express')
const router = require('./routes/router')
const port = require('./config/server-config')
const expressLayouts = require('express-ejs-layouts')

const app = express()

//this needs to be called before routing since views at given route can be using the layout
app.use(expressLayouts)

//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

//set up the router
app.use('/', router)

app.listen(port, () => console.log(`Server running on port ${port}...`))
