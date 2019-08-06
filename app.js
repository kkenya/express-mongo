const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

require('./shared/models')

const indexRouter = require('./routes/index')

const app = express()

mongoose.connect('mongodb://mongo', {
  useNewUrlParser: true,
  dbName: 'expressMongo',
  user: 'root',
  pass: 'password'
})
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

app.use('/', indexRouter)

module.exports = app
