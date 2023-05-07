
import { Application } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { enviromentOptions } from 'src/shared/constants'

dotenv.config()
const { ENVIROMENT } = process.env

export const useMorgan = (application: Application) => {
	if (ENVIROMENT != enviromentOptions.production) {
		return application.use(morgan('common'))
	}
	return null
}