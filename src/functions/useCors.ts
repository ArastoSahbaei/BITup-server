import { Application } from 'express'
import cors from 'cors'

export const useCors = (application: Application) => {
	return application.use(cors({ credentials: true }))
}