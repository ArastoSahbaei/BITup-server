import { comparePasswords, encryptPassword, generateAccessToken, generateUUID, sendAccountValidationEmail, sendPasswordRecoveryEmail } from '../../functions'
import StatusCode from '../../configurations/StatusCode'
import UserModel from '../models/User.model'
import crypto from 'crypto'

const createUser = async (request, response) => {
	const { email, password, storeID } = request.body
	const user = new UserModel({
		email: email,
		storeID: storeID,
		password: password && await encryptPassword(password),
	})

	try {
		const databaseResponse = await user.save()
		await sendAccountValidationEmail(email, generateUUID())
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const verifyUserEmail = () => {
	//TODO: verify email
}

const login = async (request, response) => {
	const { email, password } = request.body

	try {
		const user = await UserModel.findOne({ email: email })
		if (!user) {
			return response.status(StatusCode.NOT_FOUND).send({ message: 'User not found' })
		}
		const passwordValidated = await comparePasswords(password, user.password)
		if (!passwordValidated) {
			return response.status(StatusCode.UNAUTHORIZED).send({ message: 'Invalid password' })
		}
		if (user && passwordValidated) {
			return response.status(StatusCode.OK).send({
				_id: user._id,
				email: user.email,
				storeID: user.storeID,
				role: user.role,
				authenticated: true,
				token: generateAccessToken(user.email),
			})
		}
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const retrieveLostAccount = async (request, response) => {
	const { email } = request.body
	if (!email) {
		return response.status(StatusCode.BAD_REQUEST).send({ message: 'email required' })
	}
	const databaseResponse = await UserModel.findOne({ email: email })
	if (databaseResponse === null) {
		return response.status(StatusCode.FORBIDDEN).send({ message: 'Vi hittade inte den användaren' })
	} else {
		const token = crypto.randomBytes(20).toString('hex')
		const expirationDate = Date.now() + 3600000

		await UserModel.findByIdAndUpdate(databaseResponse._id, {
			accountValidation: {
				resetPasswordToken: token,
				resetPasswordExpires: expirationDate,
			}
		})

		try {
			await sendPasswordRecoveryEmail(databaseResponse, token)
			response.status(StatusCode.OK).send({ message: 'email sucessfully sent' })
		} catch (error) {
			response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
		}
	}
}

const resetPasswordWithToken = async (request, response) => {
	const { token, newPassword } = request.body
	try {
		const user: any = await UserModel.findOne({ 'accountValidation.resetPasswordToken': token })
		console.log(user.email)
		if (!user.email) {
			return response.status(StatusCode.NOT_FOUND).send({ message: 'User not found' })
		}

		const currentTime = new Date()
		const tokenTime = user.accountValidation.resetPasswordExpires
		const tokenExpired = currentTime > tokenTime
		if (tokenExpired) {
			return response.status(StatusCode.FORBIDDEN).send({ message: 'Token has expired' })
		}
		await UserModel.findByIdAndUpdate(user._id, {
			password: await encryptPassword(newPassword),
			accountValidation: {
				resetPasswordToken: '',
				resetPasswordExpires: 0,
			}
		})
		return response.status(StatusCode.OK).send({ message: 'Password reset' })
	} catch (error) {
		return response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAllUsers = async (request, response) => {
	try {
		const databaseResponse = await UserModel.find()
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	createUser,
	login,
	getAllUsers,
	retrieveLostAccount,
	resetPasswordWithToken
}