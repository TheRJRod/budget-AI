import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getExpenses, postExpenses } from "../controllers/expenseController.js";
const router = express.Router();

router.get("/", protect, getExpenses);

router.post("/", protect, postExpenses);

export default router;
