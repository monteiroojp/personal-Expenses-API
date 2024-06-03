//Import utisl
const jwt = require('jsonwebtoken')

//Function
const createToken = async (id) => {
    return jwt.sign({userId: id}, process.env.JWT_SECRET, {expiresIn: '60d'})
}

//Export 
module.exports = createToken