import mongoose from 'mongoose'

const contributionSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
    facultyId: {
        type: mongoose.Schema.ObjectId, ref: 'Faculty',
        required: true
    },
    is_public: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Contribution = mongoose.model('Contribution', contributionSchema)
export default Contribution