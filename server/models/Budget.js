import mongoose from "mongoose"


const BudgetSchema = new mongoose.Schema({
    title: String,
    targetAmount: {
        type: Number,
        default: 1000,
        required:true,
    },
    currentAmount: {
        type: Number,
        default:0,
        requred:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
})

export default mongoose.model("Budget", BudgetSchema)