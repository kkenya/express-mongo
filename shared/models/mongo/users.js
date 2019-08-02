const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String }
})

mongoose.model('User', UserSchema)
