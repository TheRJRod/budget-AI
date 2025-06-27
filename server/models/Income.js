import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
    title: String,
    total: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
})

export default mongoose.model("Income", incomeSchema)