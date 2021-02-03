import express from 'express'
import multer from 'multer'
import { uploadFile, downloadFile } from '../controllers/contribution.js';
import path from 'path'
import shortid from 'shortid'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __dirname = path.resolve();
        cb(null, path.join(__dirname, 'src/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router.post('/upload-file', upload.single('filePath'), uploadFile)
router.post('/download/:id', downloadFile)

export default router