import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

export const isDevelopmentEnv = () => {
	const isDevEnviroment = ENVIROMENT === 'DEVELOPMENT'
	return !!isDevEnviroment
}

