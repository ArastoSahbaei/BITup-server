import { Application } from 'express'
import { authenticateToken } from '../../functions/authenticateToken'
import UserController from '../controllers/User.controller'

const routes = (application: Application) => {
	application.post('/register', UserController.createUser)
	application.post('/login', authenticateToken, UserController.login)
	application.get('/user', UserController.getAllUsers)
}

export default { routes }