//Connections
const connection = require('./mySQLConnect')

//Connect function
const connectDB = async () => {
    try {
        await connection.connect()
        return console.log('Connected to DB')
    } catch (error) {
        console.log(`There was some error while connectin to DB ${error}`)
    }
}

module.exports = connectDB