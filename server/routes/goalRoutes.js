import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { patchGoals, getGoals, postGoals } from '../controllers/goalsController.js'

const router = express.Router();

router.get('/', protect, getGoals)

router.post('/', protect, postGoals)

router.patch('/:id/contribute', protect, patchGoals)

export default router;