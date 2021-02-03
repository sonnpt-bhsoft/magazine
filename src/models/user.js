import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['coordinator', 'admin', 'manager', 'guest', 'student'],
        default: 'student'
    },
    contact: {
        type: String,
    },
    profilePicture: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', userSchema)
export default User