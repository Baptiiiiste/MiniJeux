import mongoose from 'mongoose'

const BlackjackSchema = new mongoose.Schema({
    user: {type: String, unique: true, required: true},
    totalGames: {type: Number, default: 0},
    totalWins: {type: Number, default: 0},
    totalDiceThrownByUser: {type: Number, default: 0},
    total21: { type: Number, default: 0 }
})

module.exports = {
    BlackjackStats: mongoose.models.blackjackStats || mongoose.model('blackjackStats', BlackjackSchema)
}