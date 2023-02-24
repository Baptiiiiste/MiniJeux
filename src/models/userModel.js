import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  password: String
})

module.exports = {
    User: mongoose.models.users || mongoose.model('users', UserSchema)
}