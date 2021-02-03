import express from 'express'
import { createFaculty, updateFaculty, deleteFaculty } from '../controllers/faculty.js'

const router = express.Router()

router.post('/createFaculty', createFaculty)
router.put('/updateFaculty/:id', updateFaculty)
router.patch('/deleteFaculty:/id', deleteFaculty)

export default router