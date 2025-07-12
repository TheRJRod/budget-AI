import mongoose from "mongoose";

const spendingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    category: {type: String, enum: ["Bills", "Food", "Entertainment", "Healthcare", "Transportation", "Subscriptions", "Miscellaneous","Savings","Goals"], required:true},
    amount: {type:Number, required:true},
    date: {type: Date, default:Date.now},
    description: {type: String},
})

export default mongoose.model("Spending", spendingSchema);