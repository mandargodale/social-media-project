module.exports.index = (req, res) => {
    //res.json() => to send JSON data
    return res.status(200).json({
        message: 'List of posts',
        posts: []
    })
}