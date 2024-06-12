//Create routes
const express = require('express')
const router = express.Router()

//Import controllers
const {registerUser, loginUser, getAdminToken} = require('../controllers/userAuthController')

//Middlewares
const authToken = require('../middlewares/authToken')


//Routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.get('/adminToken', authToken, getAdminToken)

//Export
module.exports = router
