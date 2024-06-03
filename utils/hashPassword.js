//Import utisl
const bcrypt = require('bcryptjs')

//Function
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

//Export
module.exports = hashPassword