import { getSpending, postSpending } from "../controllers/spendingController.js";
import express from 'express';
import protect from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/', protect, getSpending)

router.post('/', protect, postSpending)

export default router;