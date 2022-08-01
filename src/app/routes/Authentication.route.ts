import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import AuthenticationController from '../controllers/Authentication.controller'

const routes = (application: Application) => {
	application.post('/login', AuthenticationController.login)
	application.post('/register', AuthenticationController.createUser)
	application.post('/retrieveaccount', AuthenticationController.retrieveLostAccount)
	application.post('/resetpassword', AuthenticationController.resetPasswordWithToken)
	application.post('/emailverification', AuthenticationController.verifyUserEmail)
	application.post('/validate', authenticateToken, AuthenticationController.validateToken)
}

export default { routes }