import dotenv from 'dotenv'
import { getEnviroment } from './getEnviroment'
import { enviromentOptions } from '../shared/constants'

dotenv.config()
const { DEV_WEBHOOK_SECRET, PROD_WEBHOOK_SECRET, STAGING_WEBHOOK_SECRET } = process.env

//TODO: rename to match others
export const getWebhookSecret = () => {
	switch (getEnviroment()) {
	case enviromentOptions.development:
		return DEV_WEBHOOK_SECRET
	case enviromentOptions.staging:
		return STAGING_WEBHOOK_SECRET
	case enviromentOptions.production:
		return PROD_WEBHOOK_SECRET
	default:
		return null
	}
}