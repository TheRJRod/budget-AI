import express from 'express'
import protect from '../middleware/authMiddleware.js'
import {getBudget, postBudget, patchTarget, patchCurrent} from '../controllers/budgetController.js'

const router = express.Router()

router.get('/', protect, getBudget)

router.post('/', protect, postBudget)

router.patch('/:id/target', protect, patchTarget)

router.patch('/:id/current', protect, patchCurrent)

export default router