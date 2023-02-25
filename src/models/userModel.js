import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  pseudo: {type: String, unique: true},
  email: {type: String, unique: true},
  password: {type: String}
})

module.exports = {
    User: mongoose.models.users || mongoose.model('users', UserSchema)
}