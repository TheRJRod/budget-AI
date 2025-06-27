import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { getIncome, postIncome } from '../controllers/incomeController.js'

const router = express.Router()

router.get('/', protect, getIncome)

router.post('/', protect, postIncome)

export default router;