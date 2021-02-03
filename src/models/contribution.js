import mongoose from 'mongoose'

const contributionSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    filePath: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Contribution = mongoose.model('Contribution', contributionSchema)
export default Contribution