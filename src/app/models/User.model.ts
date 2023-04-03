import { userRoles } from '../../shared/enums'
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
	role: {
		type: String,
		enum: userRoles,
		default: userRoles.shopOwner
	},
	accountValidation: {
		isEmailVerified: { type: Boolean, default: false },
		isAccountBanned: { type: Boolean, default: false },
		isAccountDisabled: { type: Boolean, default: false },
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
		emailVerificationToken: { type: String, default: null },
	},
	personalDetails: {
		firstName: { type: String, default: '' },
		lastName: { type: String, default: '' },
		country: { type: String, default: '' },
		address: { type: String, default: '' },
		zipCode: { type: String, default: '' },
		phone: { type: String, default: '' },
	},
	bankAccountDetails: {
		businessName: { type: String, default: '' },
		businessRegistrationNumber: { type: String, default: '' },
		bankName: { type: String, default: '' },
		bankCountry: { type: String, default: '' },
		bankAccountNumber: { type: String, default: '' },
		iban: { type: String, default: '' },
		bic: { type: String, default: '' },
	},
	store: {
		id: {
			type: String,
			required: [true, 'can\'t be blank'],
			unique: [true, 'store is already connected to an account'],
		},
		name: {
			type: String,
			required: [true, 'store name can\'t be blank'],
			unique: [true, 'store name already exists'],
		}
	}
}, { timestamps: true })



const UserModel = mongoose.model('user', userSchema)
export default UserModel