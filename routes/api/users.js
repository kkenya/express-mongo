const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/', async (req, res, next) => {
  const users = await User.find()
  res.send(users)
})

router.post('/', async (req, res, next) => {
  if (!req.body.user.name && !req.body.user.email) {
    return res.status(422).json({ error: 'invalid' })
  }
  const { name, email } = req.body.user
  User.create({ name, email })
  res.send('respond with a resource')
})

router.put('/user', async (req, res, next) => {
  const user = await User.find(req.body.id)

})
module.exports = router
