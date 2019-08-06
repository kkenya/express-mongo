const router = require('express').Router()

router.use('/api', require('./api'))
router.get('/', (req, res, next) => {
  res.json({ message: 'Hello Express' })
})

module.exports = router
