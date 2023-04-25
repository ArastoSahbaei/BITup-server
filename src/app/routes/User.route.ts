import { endpoints } from './endpoints'
import { Application } from 'express'
import { authenticateToken } from '../../middlewares'
import UserController from '../controllers/User.controller'

const { getAllUser } = endpoints.user

const routes = (application: Application) => {
	application.get(getAllUser, authenticateToken, UserController.getAllUsers)
}

export default { routes }