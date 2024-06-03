//Create routes
const express = require('express')
const router = express.Router()

//Import controllers
const {registerUser, loginUser, getAdminToken} = require('../controllers/userController')

//Middlewares
const authToken = require('../middlewares/authToken')

//Routes
router.route('/register').post(registerUser)
router.route('/login', authToken).post(loginUser)
router.get('/adminToken', authToken, getAdminToken)

//Export
module.exports = router
