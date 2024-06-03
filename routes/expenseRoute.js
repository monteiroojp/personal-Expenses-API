//Create routes
const express = require('express')
const router = express.Router()

//Import controllers
const {createExpense, getExpense, updateExpense, deleteExpense} = require('../controllers/expenseController')

//Routes
router.route('/').post(createExpense)
router.route('/:id').get(getExpense).patch(updateExpense).delete(deleteExpense)


//Export
module.exports = router
