import { comparePasswords, encryptPassword, generateAccessToken, generateUUID, sendAccountValidationEmail, sendPasswordRecoveryEmail } from '../../functions'
import StatusCode from '../../configurations/StatusCode'
import UserModel from '../models/User.model'
import crypto from 'crypto'
import BTCPayService from '../../shared/api/services/BTCPayService'

const createUser = async (request, response) => {
	const { email, password, storeName } = request.body
	const tokenUUID = generateUUID()

	try {
		const newStore: any = await BTCPayService.createStore({ name: storeName })
		if (!newStore.data.id) {
			return response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Error occured while trying to create store' })
		} else {
			await BTCPayService.connectWalletToStore(newStore.data.id)
		}

		const isEmailOccupied = await UserModel.findOne({ email: email })
		console.log(isEmailOccupied)
		if (isEmailOccupied) {
			return response.status(StatusCode.FORBIDDEN).send({ message: 'Email is already in use' })
		}
		const user: any = new UserModel({
			email: email,
			password: password && await encryptPassword(password),
			store: {
				id: newStore.data.id,
				name: storeName,
			},
			accountValidation: {
				emailVerificationToken: tokenUUID,
			}
		})
		const databaseResponse = await user.save()
		await sendAccountValidationEmail(email, tokenUUID)
		return response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		return response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const verifyUserEmail = async (request, response) => {
	const { token } = request.body
	try {
		const user = await UserModel.findOneAndUpdate(
			{ 'accountValidation.emailVerificationToken': token }, { 'accountValidation.isEmailVerified': true, 'accountValidation.emailVerificationToken': null }
		)
		if (!user) {
			return response.status(StatusCode.BAD_REQUEST).send({ message: 'Ditt konto kunde inte valideras.' })
		}
		response.status(StatusCode.OK).send({
			_id: user._id,
			email: user.email,
			role: user.role,
			token: generateAccessToken(user.email),
			authenticated: true,
			store: {
				id: user.store.id,
			},
		})
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const login = async (request, response) => {
	const { email, password } = request.body
	console.log('email: ' + email)
	try {
		const user = await UserModel.findOne({ email: email })
		if (!user) {
			return response.status(StatusCode.NOT_FOUND).send({ message: `Kunde inte hitta konto med email: ${email}` })
		}
		const passwordValidated = await comparePasswords(password, user.password)
		if (!passwordValidated) {
			return response.status(StatusCode.UNAUTHORIZED).send({ message: 'Ogiltiga inloggningsuppgifter' })
		}
		if (user && passwordValidated) {
			return response.status(StatusCode.OK).send({
				_id: user._id,
				email: user.email,
				role: user.role,
				token: generateAccessToken(user.email),
				authenticated: true,
				store: {
					id: user.store.id,
				},
			})
		}
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const validateToken = async (request, response) => {
	const { email } = request.user
	try {
		const databaseResponse = await UserModel.findOne({ email: email })
		response.status(StatusCode.OK).send({
			email: databaseResponse.email,
			role: databaseResponse.role,
			_id: databaseResponse._id,
			authenticated: true,
			token: generateAccessToken(databaseResponse.email),
			store: {
				id: databaseResponse.store.id,
			},
		})
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: 'Error occured while trying to retrieve user with email: ' + email,
			error: error.message
		})
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
		return response.status(StatusCode.OK).send({
			_id: user._id,
			email: user.email,
			storeID: user.storeID,
			role: user.role,
			authenticated: true,
			token: generateAccessToken(user.email),
		})
	} catch (error) {
		return response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const updatePassword = async (request, response) => {
	const { password } = request.body
	const { email } = request.user

	try {
		await UserModel.findOneAndUpdate({ email: email }, {
			password: await encryptPassword(password),
		})
		response.status(StatusCode.OK).send({ message: 'Password updated' })
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}

}

export default {
	login,
	createUser,
	validateToken,
	updatePassword,
	verifyUserEmail,
	retrieveLostAccount,
	resetPasswordWithToken,
}