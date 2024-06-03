//Utils 
const connection = require('../db/mySQLConnect')

//User table
const expensesSQL = `
    CREATE TABLE IF NOT EXISTS expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'Pending',
    createdAt DATETIME DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    createdBy INT NOT NULL,
    obs VARCHAR(255) DEFAULT 'Amounts are in R$XX.XX',
    FOREIGN KEY (createdBy) REFERENCES users(user_id),
    CONSTRAINT columns_not_empty_expenses CHECK (title <> '' AND description <> '' AND category <> '' AND status <> '')
    );
`

//Create tables
const expense = connection.execute(`${expensesSQL}`)