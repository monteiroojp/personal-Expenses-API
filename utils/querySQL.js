//Utils
const util = require('util')

//Import connection
const connection = require('../db/mySQLConnect')

//Query function
const query = util.promisify(connection.query).bind(connection)

//Export
module.exports = query