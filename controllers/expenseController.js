//Import utils
const query = require('../utils/querySQL')
const {StatusCodes} = require('http-status-codes')
const {BadRequest, CustomError, NotFound, Unauthorized} = require('../errors/index')
const validateFilds = require('../utils/validateFields')
const addUpdateFilds = require('../utils/addUpdateFilds')
const addQueryParams = require('../utils/addQueryParams')
const adddSortParams = require('../utils/addSortParams')

//Controllers
const createExpense = async (req, res) => {
    const {title, amount, description, date, category} = req.body
    validateFilds([title, amount, description, date, category])
    const createdBy = req.user[0].user_id

    const expense = await query(
        'INSERT INTO expenses(title, amount, description, date, category, createdBy) VALUES (?, ?, ?, ?, ?, ?)', 
        [title, amount, description, date, category, createdBy]
    )
        
    res.status(StatusCodes.CREATED).json({newExpense: {id: expense.insertId, title: title, amount: amount, description: description, date: date, category: category, createdBy: createdBy}})
}

const getAllExpenses = async (req, res) => {
    let SQL = 'SELECT * FROM expenses'
    let params = []
    const {querySQL, queryParams} = await addQueryParams(req)
    
    if(queryParams.length > 0){
        SQL += ' WHERE ' + querySQL.join(' AND ')
        params.push(...queryParams)
    }

    const sortSQL = adddSortParams(req)
    SQL += sortSQL

    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.pages) || 1
    const offset = (page -1) * limit
    SQL += ` LIMIT ?, ?`
    params.push(offset, limit)

    const expense = await query(SQL, params)
    res.status(StatusCodes.OK).send(expense)
}

const getExpense = async (req, res) => {
    const {id} = req.params
    const createdBy = req.user[0].user_id
    
    const expense = await query(
        'SELECT * FROM expenses WHERE expense_id=? AND createdBy=?',
        [id, createdBy]
    )

    if(expense.length == 0){
        throw new BadRequest('There is no expense with this Id or it does not belong to this user')
    }

    res.status(StatusCodes.OK).json({expense})
}

const updateExpense = async (req, res) => {
    const id = Number(req.params.id)
    const createdBy = req.user[0].user_id
    const toUpdatevalues = req.body
    const updateParams = []

    if(Object.keys(toUpdatevalues).length == 0){
        throw new BadRequest('Please provide at least one value to update')
    }

    let updateSQL = 'UPDATE expenses SET '
    updateSQL += addUpdateFilds(toUpdatevalues)
    updateSQL += ' WHERE expense_id = ? AND createdBy = ?';

    for (let value of Object.values(toUpdatevalues)) {
        updateParams.push(value);
    }

    updateParams.push(id, createdBy)
    const expense = await query(updateSQL, updateParams)

    if(expense.affectedRows == 0){
        throw new BadRequest('There is no expense with this Id or it does not belong to this user')
    }

    res.status(StatusCodes.OK).send({updated: true, expenseId: id})
}

const deleteExpense = async(req, res) => {
    const {id} = req.params
    const createdBy = req.user[0].user_id

    const expense = await query(
        'DELETE FROM expenses WHERE expense_id=? AND createdBy=?',
        [id, createdBy]
    )

    if(expense.affectedRows == 0){
        throw new BadRequest('There is no expense with this Id or it does not belong to this user')
    }

    res.status(StatusCodes.OK).json({deleted: true, expenseId: Number(id)})
}






//Export
module.exports = {
    createExpense,
    getAllExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
    
}