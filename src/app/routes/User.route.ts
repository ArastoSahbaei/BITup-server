import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import AuthenticationController from '../controllers/Authentication.controller'

const routes = (application: Application) => {
	application.get('/user', authenticateToken, AuthenticationController.getAllUsers)
}

export default { routes }