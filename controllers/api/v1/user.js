const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

module.exports.createSession = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email: email})
        if(!user) {
            console.log('user not found, from api')
            return res.status(422).json({
                message: 'user not found'
            })
        }
        if(user.password !== password) {
            console.log('incorrect username or password, from api')
            return res.status(422).json({
                message: 'incorrect username or password'
            })
        }
        console.log('session created using api, redirecting to home')
        return res.status(200).json({
            message: 'signed in successfully',
            data: {
                token: jwt.sign(user.toJSON(), 'jwt', {expiresIn: 10000})
            }
        })
    } catch(err) {
        console.log('err = ', err)
        return res.status(500).json({message: 'ERROR'})
    }
}
