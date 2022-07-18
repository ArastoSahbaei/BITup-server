import dotenv from 'dotenv'
import { Application } from 'express'

dotenv.config()
const { PORT } = process.env

export const connectToPort = (application: Application) => {
	const port = PORT || 3001
	try {
		application.listen(port, () => {
			console.log(`✔️  SERVER IS RUNNING ON PORT: ${port}`)
		})
	} catch (error) {
		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE PORT..')
	}
}