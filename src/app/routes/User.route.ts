import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import UserController from '../controllers/User.controller'

const routes = (application: Application) => {
	application.get('/user', authenticateToken, UserController.getAllUsers)
}

export default { routes }