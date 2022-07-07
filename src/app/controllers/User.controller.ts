import StatusCode from "../../configurations/StatusCode"
import UserModel from "../models/User.model"

const createUser = async (request, response) => {
	const user = new UserModel({
		walletID: request.body.walletID,
	})
	try {
		const databaseResponse = await user.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const login = () => {

}

const getAllUsers = () => {

}