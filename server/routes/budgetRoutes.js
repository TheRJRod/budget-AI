import express from 'express'
import protect from '../middleware/authMiddleware.js'
import {getBudget, postBudget, patchBudget} from '../controllers/budgetController.js'

const router = express.Router()

router.get('/', protect, getBudget)

router.post('/', protect, postBudget)

router.patch('/:id/target', protect, patchBudget)

export default router