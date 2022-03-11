const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

//this will create a collection of name given to mongoose.model() as first argument
//collection name will be in plural
//this will create users collection
const User = mongoose.model('User', userSchema)

module.exports = User
