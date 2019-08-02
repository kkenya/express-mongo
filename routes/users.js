var express = require('express')
var router = express.Router()

router.post('/user', function (req, res, next) {
  if (!req.body.user.name && !req.body.user.email) {
    return res.status(422).json({ error: 'invalid' })
  }
  res.send('respond with a resource')
})

module.exports = router
