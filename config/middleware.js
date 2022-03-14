//this middleware is called from app.js on all router
//it will create flash object in locals
module.exports.setFlash = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next()
}
