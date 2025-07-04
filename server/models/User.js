import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },

    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model('User', UserSchema)