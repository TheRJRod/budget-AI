import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: String,
  total: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringType: {
    type: String,
    enum: ['monthly', 'weekly', 'yearly'],
    default: null
  },
  recurringDate: {
    type: Number, // 1–31 (monthly) or 0–6 (weekly)
    default: null
  }
}, {
  timestamps: true
});



export default mongoose.model("Expense", expenseSchema)