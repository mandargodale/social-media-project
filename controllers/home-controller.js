const homeController = (req, res) => {
    //res.send('<h1>Home controller</h1>')
    res.render('home.ejs', {title: 'Home'})
}

module.exports = homeController
