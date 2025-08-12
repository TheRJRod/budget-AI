import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { getIncome, postIncome, deleteIncome, patchIncome } from '../controllers/incomeController.js'

const router = express.Router()

router.get('/', protect, getIncome)

router.post('/', protect, postIncome)

router.delete("/:id/remove", protect, deleteIncome)

router.patch("/:id/edit", protect, patchIncome)

export default router;