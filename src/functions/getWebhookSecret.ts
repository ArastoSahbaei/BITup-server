import { isDevelopmentEnv } from './isDevelopmentEnv'
import dotenv from 'dotenv'

dotenv.config()
const { DEV_WEBHOOK_SECRET, PROD_WEBHOOK_SECRET } = process.env

export const getWebhookSecret = () => {
	//TODO: so apperently every store has its own webhook secret, so we need to get the secret from the store in the database and return it here
	//1. Save in database? - Can anyone call the webhook if the secret is based on the store?

	/* return isDevelopmentEnv() ? DEV_WEBHOOK_SECRET : PROD_WEBHOOK_SECRET */
	return 'fz4QZQ7Wf95277Q5Co9CVqYjwrp'
}