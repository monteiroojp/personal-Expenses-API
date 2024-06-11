//Import utils
const path = require('path')
const query = require('../utils/querySQL')
const {StatusCodes} = require('http-status-codes')
const {BadRequest, CustomError, NotFound, Unauthorized} = require('../errors/index')
const validateFilds = require('../utils/validateFields')


//Controllers
const updateUserProfile = async (req, res) => {
    const {bio} = req.body
    const file = req.file

    const profileImgPath = `/uploads/${file.filename}`
    const id = req.user[0].user_id
    const userProfile = await query('UPDATE users SET bio=?, profile_img=? WHERE user_id=?', [bio, profileImgPath, id])

    console.log(userProfile)
    if(userProfile.affectedRows == 0){
        throw new BadRequest('There is no expense with this Id or it does not belong to this user')
    }

    res.status(StatusCodes.OK).send('Profile updated sucssefully')
}

const getUserInfo = async (req, res) => {
    const id = req.user[0].user_id
    const user = await query('SELECT * FROM users WHERE user_id=?', [id])

    if(user.length == 0){
        throw new NotFound('There is no user with this Id')
    }

    res.status(StatusCodes.OK).json({user})
}

const getUserProfileImage = async (req, res) => {
    const id = req.user[0].user_id
    const profileImg = await query('SELECT profile_img FROM users WHERE user_id=?', [id])

    if(profileImg.length == 0){
        throw new NotFound('There is no user with this id or the user does not have a profile image')
    }

    const pathImg = path.join(__dirname, '../', profileImg[0].profile_img)
    console.log(pathImg)

    res.status(StatusCodes.OK).sendFile(pathImg)
}

//Export
module.exports = {
    updateUserProfile,
    getUserInfo,
    getUserProfileImage
}