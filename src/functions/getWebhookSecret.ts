import dotenv from 'dotenv'
import { getEnviroment } from './getEnviroment'
import { enviromentOptions } from '../shared/constants'

dotenv.config()
const { DEV_WEBHOOK_SECRET, PROD_WEBHOOK_SECRET, STAGING_WEBHOOK_SECRET } = process.env

export const getWebhookSecret = () => {
	switch (getEnviroment()) {
	case enviromentOptions.development:
		console.log('DEV_WEBHOOK_SECRET: ', DEV_WEBHOOK_SECRET)
		return DEV_WEBHOOK_SECRET
	case enviromentOptions.staging:
		console.log('STAGING_WEBHOOK_SECRET: ', STAGING_WEBHOOK_SECRET)
		return STAGING_WEBHOOK_SECRET
	case enviromentOptions.production:
		console.log('PROD_WEBHOOK_SECRET: ', PROD_WEBHOOK_SECRET)
		return PROD_WEBHOOK_SECRET
	default:
		console.log('No secret found')
		return null
	}
}