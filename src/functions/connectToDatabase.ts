import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const {
	DEV_DATABASE_URL,
	PROD_DATABASE_URL,
	ENVIROMENT
} = process.env

export const connectToDatabase = () => {
	const DATABASE_URL = ENVIROMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL //TODO: tbh this should also be getEnviromentBased function
	try {
		mongoose.connect(DATABASE_URL, {})
		console.log(`✔️  SUCCESSFULLY CONNECTED TO THE ${ENVIROMENT} DATABASE..`)
	} catch (error) {
		console.log('❌  ERROR OCCURED WHILE TRYING TO CONNECT TO THE DATABASE..')
		process.exit()
	}
}