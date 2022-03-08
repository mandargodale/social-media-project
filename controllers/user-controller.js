const User = require('../models/user')

module.exports.profile = (req, res) => {
    res.render('profile.ejs', {title: 'Profile'})
}

//render the sign up page
module.exports.signUp = (req, res) => {
    res.render('sign-up.ejs', {title: 'Sign Up'})
}

//render the sign in page
module.exports.signIn = (req, res) => {
    res.render('sign-in.ejs', {title: 'Sign In'})
}

//get sign up form data and create user
module.exports.create = (req, res) => {
    //destructuring form data from req.body
    //req.body is created by express.urlencoded()
    const {name, email, password, confirmPassword} = req.body
    if(password !== confirmPassword) {
        res.redirect('back')
    }
    //if any error occurs, it will be stored in err
    //if the user is found with given email, it will be stored in user
    User.findOne({email: email}, (err, user) => {
        if(err) {
            console.log('error in finding if user already exists before signing up')
            return
        }
        if(!user) {
            /*User.create({email, password, name}, (err, user) => {
                if(err) {
                    console.log('error in creating user while signing up')
                    return
                }
                console.log('user created successfully')
                res.redirect('/user/sign-in')
            })*/

            //using promise
            /* User.create({email, password, name})
                .then(() => {
                    console.log('user created successfully')
                    res.redirect('/user/sign-in')
                })
                .catch((err) => {
                    console.log('error in creating user while signing up')
                    return
                }) */
            
            //using async-await
            createUserAsync(res, email, password, name);
        }
        if(user) {
            console.log('user = ', user)
            res.redirect('/user/sign-in')
        }
    })
}

//get sign in form data and create session for the user
module.exports.createSession = (req, res) => {
    //TODO
}

const createUserAsync = async (res, email, password, name) => {
    try {
        await User.create({email, password, name})
        console.log('user created successfully')
        res.redirect('/user/sign-in')
    } catch(err) {
        console.log('error in creating user while signing up')
        res.redirect('/user/sign-up')
    }
}
