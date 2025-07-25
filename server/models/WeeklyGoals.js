import mongoose from "mongoose";

const weeklyGoalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weekStart: {
    type: Date,
    required: true,
  },
  goals: [
    {
      title: {
        type: String,
        required: true,
      },
      currentAmount: {
        type: Number,
        default: 0,
      },
      targetAmount: {
        type: Number,
        required: true,
      },
      linkedGoalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goals",
        default: null,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("WeeklyGoal", weeklyGoalsSchema);
