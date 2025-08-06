import mongoose from "mongoose";

const PracticeSchema = new mongoose.Schema({
    title: String,
    total: Number,
    collection: {
        collectTitle: {
            type:String,
            required:true
        },
        collectTotal: {
            type:Number,
            required:true
        }
    }
})

export default mongoose.model("Practice", PracticeSchema)