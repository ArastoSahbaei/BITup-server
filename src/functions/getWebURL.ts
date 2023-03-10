import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

export const getWebURL = () => {
	//TODO: get enviroment from external function
	const isDevEnviroment = ENVIROMENT === 'DEVELOPMENT'
	return isDevEnviroment ? 'http://localhost:3000' : 'http://bitup.com'
}

