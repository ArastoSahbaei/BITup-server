import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import UserController from '../controllers/User.controller'

const routes = (application: Application) => {
	application.get('/user', authenticateToken, UserController.getAllUsers)
	application.post('/login', UserController.login)
	application.post('/register', UserController.createUser)
	application.post('/retrieveaccount', UserController.retrieveLostAccount)
	application.post('/resetpassword', UserController.resetPasswordWithToken)
}

export default { routes }