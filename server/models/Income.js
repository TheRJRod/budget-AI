import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  title: String,
  total: Number,
  category: String,
  transactionDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringType: {
    type: String,
    enum: ["monthly", "weekly", "yearly", "none"],
    default: null,
  },
  recurrenceDetails: {
    dayOfMonth: {
      type: Number, // for monthly: 1–31
      default: null,
    },
    dayOfWeek: {
      type: Number, // for weekly: 0 (Sunday) – 6 (Saturday)
      default: null,
    },
    month: {
      type: Number, // for yearly: 0 (January) – 11 (December)
      default: null,
    },
    dayOfYear: {
      type: Number, // Optional alternative: 1–365 for yearly
      default: null,
    },
  },
}, {
  timestamps: true,
});




export default mongoose.model("Income", incomeSchema)