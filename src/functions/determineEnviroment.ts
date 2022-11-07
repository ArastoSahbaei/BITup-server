import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

export const determineEnviroment = () => {
	const isDevEnviroment = ENVIROMENT === 'DEVELOPMENT'
	return !!isDevEnviroment
}

