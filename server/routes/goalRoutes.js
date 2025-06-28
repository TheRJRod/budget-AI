import express from 'express'
import protect from '../middleware/authMiddleware'
import { patchGoals, getGoals, postGoals } from '../controllers/goalsController'

const router = express.Router();

router.get('/', protect, getGoals)

router.post('/', protect, postGoals)

router.patch('/:id/contribute', protect, patchGoals)

export default router;