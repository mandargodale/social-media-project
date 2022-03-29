const express = require('express')
const router = require('./routes/router')
const config = require('./config/config')
const expressLayouts = require('express-ejs-layouts')
const connectToDb = require('./config/db-connection')
//const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
//if we restart server, our cookie was getting expired even though maxAge time is not passed
//to avoid this problem, we can use connect-mongo package to store session in db
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const customeMiddleware = require('./config/middleware')
const path = require('path')
require('./config/passport-local-strategy')
require('./config/passport-jwt-strategy')
require('dotenv').config()

const {PORT, MONGO_URL} = process.env

const app = express()

//this will parse form data
//this will create body object inside req and store parsed data in it
app.use(express.urlencoded({extended: false}))

//this will parse cookies
//this will create cookies object inside req and store parsed data in it
//app.use(cookieParser())

//currently our scss converts into css for every request and then the css is sent to browser
//this should be optimized to convert all scss into css at once and then send it to browser
// app.use(sassMiddleware({
//     src: './public/scss',
//     dest: './public/css',
//     //debug: true,
//     outputStyle: 'expanded',
//     prefix: '/css'
// }))

//for serving static files
//this should be done before layout is created since layout can be using css, js, images etc from public
app.use(express.static('./public'))

//to make files in uploads available to browser
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//this needs to be called before routing since views at given route can be using the layout
app.use(expressLayouts)

//this middleware will create session cookie
//it also encrypts the cookie
app.use(session({
    name: 'spm',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600000  //60 minutes
    },
    //creating new MongoStore and assigning it to store key in session
    store: MongoStore.create({ mongoUrl: MONGO_URL, autoRemove: 'disabled' })
}))

app.use(passport.initialize())
//it is used to create passport session in express session
app.use(passport.session())
//this middleware will be called for every route, it will set req.uesr to res.locals.user
app.use(passport.setAuthenticatedUser)

//for flash messages
//use this after session is created to store flash messages in session cookies
app.use(flash())
app.use(customeMiddleware.setFlash)

//this will put css and js files in layout at specified position in layout.ejs i.e. at <%- style %> and <%- script %>
//without this, css and js will be in between <body>
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

//set up the router
app.use('/', router)

const startServer = async () => {
    try {
        await connectToDb(MONGO_URL)
        app.listen(PORT, () => console.log(`Connected to MongoDB and server is running on port ${PORT}`))
    } catch(err) {
        console.log(err)
    }
}

startServer()
