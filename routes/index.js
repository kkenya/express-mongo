var router = require('express').Router()

router.use('/api', require('./api'))
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' })
// })

module.exports = router
