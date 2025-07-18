import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
  title: String,
  total: Number,
  category: String,
  transactionDate: {
    type: Date,
  },
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



export default mongoose.model("Income", incomeSchema)