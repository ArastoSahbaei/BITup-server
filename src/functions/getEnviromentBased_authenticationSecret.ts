import dotenv from 'dotenv'
import { enviromentOptions } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

dotenv.config()
export const getEnviromentBased_authenticationSecret = () => {
	const { DEV_AUTH_SECRET, STAGING_AUTH_SECRET, PROD_AUTH_SECRET } = process.env
	switch (getEnviroment()) {
	case enviromentOptions.development:
		return DEV_AUTH_SECRET
	case enviromentOptions.staging:
		return STAGING_AUTH_SECRET
	case enviromentOptions.production:
		return PROD_AUTH_SECRET
	default:
		return null
	}
}