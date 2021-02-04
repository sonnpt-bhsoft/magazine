import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __dirname = path.resolve();
        cb(null, path.join(__dirname, 'src/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})

export const upload = multer({ storage })