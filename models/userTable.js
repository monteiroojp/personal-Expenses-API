//Utils 
const connection = require('../db/mySQLConnect')

//User table
const usersSQL = `
    CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_img VARCHAR(255) DEFAULT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT NOW(),
    CONSTRAINT columns_not_empty CHECK (username <> '' AND email <> '' AND password <> '')
    );
`

//Create table
const user = connection.execute(`${usersSQL}`)
