const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/api/users')

const app = express()

mongoose.connect('mongodb://mongo/expressMongo', { useNewUrlParser: true })
  .catch(e => console.error(e))
mongoose.connection.on('error', e => console.error(e))
const db = mongoose.connection
db.once('open', () => {
  console.log('connected.')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
// app.use('/users', usersRouter)

require('./shared/models/mongo')

module.exports = app
