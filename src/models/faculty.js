import mongoose from 'mongoose'

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Faculty = mongoose.model('Faculty', facultySchema)
export default Faculty