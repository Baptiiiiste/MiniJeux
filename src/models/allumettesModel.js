import mongoose from 'mongoose'

const AllumettesSchema = new mongoose.Schema({
    user: {type: String, unique: true, required: true},
    totalGames: {type: Number, default: 0},
    totalWins: {type: Number, default: 0}
})

module.exports = {
    AllumettesStats: mongoose.models.allumettesStats || mongoose.model('allumettesStats', AllumettesSchema)
}
