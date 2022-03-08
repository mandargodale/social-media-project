module.exports.home = (req, res) => {
    //res.send('<h1>Home controller</h1>')
    res.render('home.ejs', {title: 'Home'})
}
