const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jP61409527',
    database: 'expensesapidb',
    port: process.env.DB_PORT,
    waitForConnections: true
})

module.exports = connection