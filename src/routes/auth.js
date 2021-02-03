import express from 'express'
import { register, login, logOut } from '../controllers/auth.js'
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from '../validators/auth.js'
import shortid from 'shortid'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __dirname = path.resolve();
        cb(null, path.join(__dirname, 'src/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/register', validateSignUpRequest, isRequestValidated, upload.single('profilePicture'), register)
router.post('/login', validateSignInRequest, isRequestValidated, login)
router.post('/logout', logOut)

export default router