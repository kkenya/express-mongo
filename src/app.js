const express = require('express')
const exegesisExpress = require('exegesis-express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')

// app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

// /**
//  * Module dependencies.
//  */

// var debug = require('debug')('express-mongo:server')

// /**
//  * Get port from environment and store in Express.
//  */

// var port = normalizePort(process.env.PORT || '3000')
// app.set('port', port)

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app)

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port)
// server.on('error', onError)
// server.on('listening', onListening)

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10)

//   if (isNaN(port)) {
//     // named pipe
//     return val
//   }

//   if (port >= 0) {
//     // port number
//     return port
//   }

//   return false
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges')
//       process.exit(1)
//       break
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use')
//       process.exit(1)
//       break
//     default:
//       throw error
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address()
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port
//   debug('Listening on ' + bind)
// }
//
//
//
//
//
//
//
async function createServer () {
  // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
  const options = {
    controllers: path.resolve(__dirname, './controllers'),
    allowMissingControllers: false
  }

  // This creates an exegesis middleware, which can be used with express,
  // connect, or even just by itself.
  const exegesisMiddleware = await exegesisExpress.middleware(
    path.resolve(__dirname, './api/oas.yaml'),
    options
  )

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

  // If you have any body parsers, this should go before them.
  app.use(exegesisMiddleware)
  app.use('/', indexRouter)

  // Return a 404
  app.use((req, res) => {
    res.status(404).json({ message: `Not found` })
  })

  // Handle any unexpected errors
  app.use((err, req, res, next) => {
    res.status(500).json({ message: `Internal error: ${err.message}` })
  })

  const server = http.createServer(app)

  return server
}

createServer()
  .then(server => {
    server.listen(3000)
    console.log('Listening on port 3000')
    console.log('Try visiting http://localhost:3000/greet?name=Jason')
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
