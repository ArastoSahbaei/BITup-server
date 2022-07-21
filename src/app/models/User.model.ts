import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		required: [true, 'can\'t be blank'],
		match: [/\S+@\S+\.\S+/, 'invalid email'],
		index: true,
		unique: true
	},
	password: {
		type: String,
		required: false,
	},
	storeID: {
		type: String,
		required: [true, 'can\'t be blank'],
		unique: [true, 'must be unique'],
	}
}, { timestamps: true })



const UserModel = mongoose.model('user', userSchema)
export default UserModel