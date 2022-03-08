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
    //TODO
}

//get sign in form data and create session for the user
module.exports.createSession = (req, res) => {
    //TODO
}
