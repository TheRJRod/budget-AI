import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expensesRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import spendRoutes from "./routes/spendingRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import weeklyGoals from "./routes/weeklyGoals.js";
import budgetRoutes from "./routes/budgetRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/spending", spendRoutes);
app.use("/api", aiRoutes);
app.use("/api/weekly-goals", weeklyGoals);
app.use("/api/budget", budgetRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
