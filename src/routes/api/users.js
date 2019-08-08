const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/', async (req, res, next) => {
  const users = await User.find()
  res.send(users)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  const users = await User.findById(id)

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

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { name, email } = req.body.user

  User.findByIdAndUpdate(id, { name, email })
  res.send(`user: ${id} is updated`)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  User.findByIdAndDelete(id)

  res.send(`user: ${id} is deleted`)
})
module.exports = router
