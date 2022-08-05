import { Application } from 'express'
import helmet from 'helmet'

export const useHelmet = (application: Application) => {
	return application.use(helmet())
}