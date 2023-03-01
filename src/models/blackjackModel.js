import mongoose from 'mongoose'

const BlackjackSchema = new mongoose.Schema({
    user: {type: String, unique: true, required: true},
    totalGames: {type: Number, default: 0},
    totalWins: {type: Number, default: 0},
    totalDiceThrownByUser: {type: Number, default: 0},
    total21ByUser: { type: Number, default: 0 },
    averageScoreOfDiceThrownByUser: {type: Number, default: 0},
    totalBustByUser: {type: Number, default: 0},
})

module.exports = {
    BlackjackStats: mongoose.models.blackjackStats || mongoose.model('blackjackStats', BlackjackSchema)
}
