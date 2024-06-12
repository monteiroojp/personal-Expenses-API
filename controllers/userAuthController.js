//Import utils
const query = require('../utils/querySQL')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const {BadRequest, CustomError, NotFound, Unauthorized} = require('../errors/index')
const hashPassword = require('../utils/hashPassword')
const createToken = require('../utils/createToken')
const validateFilds = require('../utils/validateFields')


//Controllers
const registerUser = async (req, res) => {
    const {username, email, password, adminToken} = req.body
    validateFilds([username, email, password])

    const isAdmin = (adminToken === process.env.ADMIN_TOKEN) ? true : false;
    const hashedPassword = await hashPassword(password)
    const user = await query(
    'INSERT INTO users(username, email, password, is_admin) VALUES(?, ?, ?, ?)', 
    [username, email, hashedPassword, isAdmin]
    )

    const token = await createToken(user.insertId)
    res.status(StatusCodes.CREATED).json({token})
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    validateFilds([email, password])
    const user = await query('SELECT * FROM users WHERE email=?', [email])

    if(user.length == 0){
        throw new NotFound('There is no user with this email')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password)

    if(!isPasswordCorrect){
        throw new Unauthorized('Invalid password')
    }

    const token = await createToken(user[0].user_id)
    res.status(StatusCodes.OK).json({token})
}

const getAdminToken = async (req, res) => {
    const isAdmin = req.user[0].is_admin

    if(isAdmin == 0){
        throw new Unauthorized('This user is not allowed to get the admin token')
    }

    res.status(StatusCodes.OK).json({adminToken: process.env.ADMIN_TOKEN})
}


//Export
module.exports = {
    registerUser,
    loginUser,
    getAdminToken
}