//Import status codes
const {StatusCodes} = require('http-status-codes')

//Error handler function
const errorHandler = (error, req, res, next) => {
    let customError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || `Something went wrong, try again later`
    }

    if (error.code === 'ER_DUP_ENTRY'){
        customError.statusCode = 400,
        customError.msg = 'This email already belongs to another user'
    }

    return res.status(customError.statusCode).json({error: customError.msg})
}

//Export
module.exports = errorHandler