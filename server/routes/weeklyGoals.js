import express from "express";
import {
  getWeeklyGoals,
  postWeeklyGoals,
} from "../controllers/weeklyGoalsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWeeklyGoals);
router.post("/ai-generate", protect, postWeeklyGoals);

export default router;
