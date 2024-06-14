//Create routes
const express = require('express')
const router = express.Router()

//Import controllers
const {createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense, getAmountPerCategory, getAmountPerDay} = require('../controllers/expenseController')

//Routes
router.route('/').post(createExpense).get(getAllExpenses)
router.route('/:id').get(getExpense).patch(updateExpense).delete(deleteExpense)
router.route('/summary/by-category').get(getAmountPerCategory)
router.route('/summary/by-day-on-last-month').get(getAmountPerDay)

//Export
module.exports = router
