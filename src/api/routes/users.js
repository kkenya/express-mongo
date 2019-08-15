const mongoose = require('mongoose')
const User = mongoose.model('User')

// router.get('/', async (req, res, next) => {
const list = async (req, res, next) => {
  const users = await User.find().exec()
  res.send(users)
}

// router.get('/:id', async (req, res, next) => {
const get = async (req, res, next) => {
  const user = await User.findById(req.params.id).exec()

  res.send(user)
}

// router.post('/', async (req, res, next) => {
const register = async (req, res, next) => {
  if (!req.body.user.name && !req.body.user.email) {
    return res.status(422).json({ error: 'invalid' })
  }
  const { name, email } = req.body.user
  User.create({ name, email })
  res.send('user created')
}

// router.put('/:id', async (req, res, next) => {
const update = async (req, res, next) => {
  const { name, email } = req.body.user

  const user = await User.update({
    id: req.params.id,
    name,
    email
  })

  res.send(user)
}

// router.delete('/:id', async (req, res, next) => {
const destroy = async (req, res, next) => {
  const { id } = req.params

  User.findByIdAndDelete(id)

  res.send(`user ${req.body.user.id} deleted`)
}

module.exports = {
  'users#list': list,
  'users#get': get,
  'users#register': register,
  'users#update': update,
  'users#destroy': destroy
}
