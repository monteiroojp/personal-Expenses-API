//Import utils
const query = require('../utils/querySQL')

//Controllers
const registerUser = async () => {
    const {username, email, password} = req.body
    const user = query('INSERT INTO users')
}







//Export