import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

export const getEnviroment = () => {
	return ENVIROMENT
}