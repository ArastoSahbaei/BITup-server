import StatusCode from '../../configurations/StatusCode'
import { comparePasswords, encryptPassword, generateAccessToken } from '../../functions'
import UserModel from '../models/User.model'

const createUser = async (request, response) => {
	const { email, password, storeID } = request.body

	const user = new UserModel({
		email: email,
		storeID: storeID,
		password: await encryptPassword(password)
	})

	try {
		const databaseResponse = await user.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
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
				authenticated: true,
				token: generateAccessToken(user.email),
			})
		}

	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}

}

const retrieveLostPassword = async (request, response) => {
	console.log('retrieveLostPassword')
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
	retrieveLostPassword
}