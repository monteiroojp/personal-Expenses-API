//Create routes
const express = require('express')
const router = express.Router()

//Import controllers
const {updateUserProfile, getUserProfileImage, getUserInfo} = require('../controllers/userProfileController')

//Middlewares
const authToken = require('../middlewares/authToken')
const upload = require('../db/fileStorage')

//Routes
router.patch('/profile',  upload.single('profile_img'), updateUserProfile)
router.get('/profile', getUserProfileImage)
router.route('/').get(getUserInfo)

//Export
module.exports = router
