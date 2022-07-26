import { Application } from 'express'
import AuthenticationController from '../controllers/Authentication.controller'

const routes = (application: Application) => {
	application.post('/login', AuthenticationController.login)
	application.post('/register', AuthenticationController.createUser)
	application.post('/retrieveaccount', AuthenticationController.retrieveLostAccount)
	application.post('/resetpassword', AuthenticationController.resetPasswordWithToken)
	application.post('/emailverification', AuthenticationController.verifyUserEmail)
}

export default { routes }