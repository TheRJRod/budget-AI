import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: String,
    total: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default mongoose.model("Expense", expenseSchema)