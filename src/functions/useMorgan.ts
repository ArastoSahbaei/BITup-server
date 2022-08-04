import { Application } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

export const useMorgan = (application: Application) => {
	if (ENVIROMENT === 'DEVELOPMENT') {
		return application.use(morgan('common'))
	}
}