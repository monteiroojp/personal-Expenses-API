//Import utils
const multer = require('multer')
const path = require('path')

//Define file storage
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads')
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const fileSufix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, fileSufix + file.originalname)
    }
})

//Export
const upload = multer({storage: storage})
module.exports = upload