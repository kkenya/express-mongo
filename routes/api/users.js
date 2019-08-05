var express = require('express')
var router = express.Router()

router.get('/', async (req, res, next) => {
  console.log(req)
  const users = await Users.find()
  res.send(users)
})

router.post('/user', async (req, res, next) => {
  if (!req.body.user.name && !req.body.user.email) {
    return res.status(422).json({ error: 'invalid' })
  }
  const { name, email } = req.body.user
  // Users.create({ name, email })
  res.send('respond with a resource')
})

module.exports = router
