module.exports.home = (req, res) => {
    return res.render('home.ejs', {title: 'Home'})
}
