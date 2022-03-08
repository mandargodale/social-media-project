module.exports.profile = (req, res) => {
    res.render('profile.ejs', {title: 'Profile'})
}

module.exports.signUp = (req, res) => {
    res.render('sign-up.ejs', {title: 'Sign Up'})
}

module.exports.signIn = (req, res) => {
    res.render('sign-in.ejs', {title: 'Sign In'})
}
