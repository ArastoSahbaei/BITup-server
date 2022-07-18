import { Application } from 'express'
import { authenticateToken } from '../../functions/authenticateToken'
import UserController from '../controllers/User.controller'

const routes = (application: Application) => {
	application.post('/register', UserController.createUser)
	application.post('/login', UserController.login)
	application.get('/user', /* authenticateToken, */ UserController.getAllUsers)
}

export default { routes }