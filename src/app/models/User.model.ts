import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    unique: true
  },
}, { timestamps: true })

const UserModel = mongoose.model('user', userSchema)
export default {UserModel}