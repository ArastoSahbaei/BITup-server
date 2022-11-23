import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

//TODO: Re-write this to 'getEnv' and return the correct env
export const isDevelopmentEnv = () => {
	const isDevEnviroment = ENVIROMENT === 'DEVELOPMENT'
	return !!isDevEnviroment
}

