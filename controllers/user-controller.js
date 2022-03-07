const userController = (req, res) => {
    res.render('profile.ejs', {title: 'Profile'})
}

module.exports = userController
