const express = require('express')
const PORT = require('./config/server-config')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
