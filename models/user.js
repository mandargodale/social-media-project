const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const profilePicturePath = path.join('uploads', 'user', 'profile-pictures')

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
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true})

const storage = multer.diskStorage({
    //file will be stored here
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..' ,profilePicturePath))
    },
    //this will create filename
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)  //file.fieldname = profilePicture
    }
})

//static methods
userSchema.statics.uploadedProfilePicture = multer({ storage: storage }).single('profilePicture')
userSchema.statics.profilePicturePath = profilePicturePath

//this will create a collection of name given to mongoose.model() as first argument
//collection name will be in plural
//this will create users collection
const User = mongoose.model('User', userSchema)

module.exports = User
