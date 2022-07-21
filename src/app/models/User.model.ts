import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		required: [true, 'can\'t be blank'],
		match: [/\S+@\S+\.\S+/, 'invalid email'],
		allowNull: [false, 'can\'t be null'],
		unique: true,
		index: true,
	},
	password: {
		type: String,
		allowNull: [false, 'can\'t be null'],
		required: false,
	},
	accountValidation: {
		isEmailVerified: { type: Boolean, default: false },
		isAccountDisabled: { type: Boolean, default: false },
		isAccountBanned: { type: Boolean, default: false },
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
	},
	role: {
		type: String,
		enum: ['shopOwner', 'admin'],
		default: 'shopOwner'
	},
	storeID: {
		type: String,
		required: [true, 'can\'t be blank'],
		unique: [true, 'must be unique'],
	}
}, { timestamps: true })



const UserModel = mongoose.model('user', userSchema)
export default UserModel