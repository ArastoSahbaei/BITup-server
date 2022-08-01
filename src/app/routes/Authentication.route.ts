import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import AuthenticationController from '../controllers/Authentication.controller'

const routes = (application: Application) => {
	application.post('/login', AuthenticationController.login)
	application.post('/register', AuthenticationController.createUser)
	application.post('/emailverification', AuthenticationController.verifyUserEmail)
	application.post('/retrieveaccount', AuthenticationController.retrieveLostAccount)
	application.post('/resetpassword', AuthenticationController.resetPasswordWithToken)
	application.post('/validate', authenticateToken, AuthenticationController.validateToken)
	application.put('/update-password', authenticateToken, AuthenticationController.updatePassword)
}

export default { routes }