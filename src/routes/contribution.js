import express from 'express'
import { uploadFile, downloadFile, publicContribution, statistic, getContributions, getContributionsByFaculty } from '../controllers/contribution.js';
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { upload } from '../upload.js'
const router = express.Router()

router.get('/get-all-contributions', getContributions)
router.get('/contributions-by-faculty', requireSignIn, checkRole('coordinator'), getContributionsByFaculty)
router.post('/upload-file', upload.single('filePath'), requireSignIn, checkRole('student'), uploadFile)
router.get('/download/:id', requireSignIn, checkRole('coordinator', 'manager'), downloadFile)
router.post('/public-contribution', publicContribution)
router.get('/statistic', statistic)

export default router