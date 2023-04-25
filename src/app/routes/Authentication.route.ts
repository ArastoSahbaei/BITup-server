import { endpoints } from './endpoints'
import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import AuthenticationController from '../controllers/Authentication.controller'

const {
	login,
	createUser,
	verifyUserEmail,
	retrieveLostAccount,
	resetPasswordWithToken,
	validateToken,
	updatePassword
} = endpoints.authentication

const routes = (application: Application) => {
	application.post(login, AuthenticationController.login)
	application.post(createUser, AuthenticationController.createUser)
	application.post(verifyUserEmail, AuthenticationController.verifyUserEmail)
	application.post(retrieveLostAccount, AuthenticationController.retrieveLostAccount)
	application.post(resetPasswordWithToken, AuthenticationController.resetPasswordWithToken)
	application.post(validateToken, authenticateToken, AuthenticationController.validateToken)
	application.put(updatePassword, authenticateToken, AuthenticationController.updatePassword)
}

export default { routes }