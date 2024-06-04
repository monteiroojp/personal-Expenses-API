//Express errors
require('express-async-errors')

//Env data
require('dotenv').config()

//App
const express = require('express')
const app = express()

//Extra securites import
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//Security Middlewares
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
}))
app.use(xss())
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100
}))

//Extract data from requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes middleware
const authToken = require('./middlewares/authToken.js')

//Import routes
const userRoute = require('./routes/userRoute.js')
const expenseRoute = require('./routes/expenseRoute.js')

//Routes
app.use('/api/v1/auth', userRoute)
app.use('/api/v1/expenses', authToken, expenseRoute)

//Middlewares import
const errorHandler = require('./middlewares/errorHandler.js')
const notFound = require('./middlewares/notFound.js')

//Middlewares
app.use(errorHandler)
app.use(notFound)

//Start setup
const port = process.env.PORT_SERVER || 3000;
const connectDB = require('./db/connectDB.js')

const start = async () => {
  try {
    await connectDB()
    await require('./models/index.js')
    app.listen(port, () => console.log(`The server is running on port ${port}`))
  } catch (error) {
    console.log(`There was some error while starting the API, ${error}`)
  }
}

start()