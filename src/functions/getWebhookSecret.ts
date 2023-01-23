import { isDevelopmentEnv } from './isDevelopmentEnv'
import dotenv from 'dotenv'

dotenv.config()
const { DEV_WEBHOOK_SECRET, PROD_WEBHOOK_SECRET } = process.env

export const getWebhookSecret = () => {
	return isDevelopmentEnv() ? DEV_WEBHOOK_SECRET : PROD_WEBHOOK_SECRET
}