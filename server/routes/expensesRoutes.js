import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getExpenses, postExpenses, deleteExpenses, patchExpenses } from "../controllers/expenseController.js";
const router = express.Router();

router.get("/", protect, getExpenses);

router.post("/", protect, postExpenses);

router.delete("/:id/remove", protect, deleteExpenses)

router.patch("/:id/edit", protect, patchExpenses)

export default router;
