import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT } = process.env

export const getEnviroment = () => {
	console.log('getEnviroment')
	console.log('ENVIROMENT', ENVIROMENT)
	return ENVIROMENT
}