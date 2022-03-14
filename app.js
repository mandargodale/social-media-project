const express = require('express')
const router = require('./routes/router')
const port = require('./config/server-config')
const expressLayouts = require('express-ejs-layouts')
const connectToDb = require('./config/db-connection')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
//if we restart server, our cookie was getting expired even though maxAge time is not passed
//to avoid this problem, we can use connect-mongo package
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const cutomeMiddleware = require('./config/middleware')

const mongoUrl = 'mongodb+srv://mandartodoappuser:mandartodoapppass@todoapp.jz7vz.mongodb.net/smpDB?retryWrites=true&w=majority'

const app = express()

//this will parse form data
//this will create body object inside req and store parsed data in it
app.use(express.urlencoded({extended: false}))

//this will parse cookies
//this will create cookies object inside req and store parsed data in it
app.use(cookieParser())

//currently our scss converts into css for every request and then the css is sent to browser
//this should be optimized to convert all scss into css at once and then send it to browser
app.use(sassMiddleware({
    src: './public/scss',
    dest: './public/css',
    //debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

//for serving static files
//this should be done before layout is created since layout can be using css, js, images etc from public
app.use(express.static('./public'))

//this needs to be called before routing since views at given route can be using the layout
app.use(expressLayouts)

//this will put css and js files in layout at specified position in layout.ejs i.e. at <%- style %> and <%- script %>
//without this, css and js will be in between <body>
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

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
    store: MongoStore.create({ mongoUrl: mongoUrl, autoRemove: 'disabled' })
}))

app.use(passport.initialize())
app.use(passport.session())
//this middleware will be called for every route, it will set req.uesr to res.locals.user
app.use(passport.setAuthenticatedUser)

//for flash messages
//use this after session is created to store flash messages in session cookies
app.use(flash())
app.use(cutomeMiddleware.setFlash)

//set up the router
app.use('/', router)

//app.listen(port, () => console.log(`Server running on port ${port}...`))

const startServer = async () => {
    try {
        await connectToDb(mongoUrl)
        app.listen(port, () => console.log(`Connected to MongoDB and server is running on port ${port}`))
    } catch(err) {
        console.log(err)
    }
}

startServer()
