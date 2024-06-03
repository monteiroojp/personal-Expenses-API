//Import errors
const {BadRequest, Unauthorized} = require('../errors/index')

//Import utils
const query = require('../utils/querySQL')
const jwt = require('jsonwebtoken')

//Auth jwt middleware
const authJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || authHeader.startsWith('Bearer null')){
        throw new BadRequest('Please provide a valid token')
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const payLoad = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await query('SELECT * FROM users WHERE user_id=?', [payLoad.userId])
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

//Export
module.exports = authJwt