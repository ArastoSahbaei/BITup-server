import dotenv from 'dotenv'
import { getEnviroment } from './getEnviroment'
import { enviromentOptions } from '../shared/constants'

dotenv.config()
const { DEV_BTCPAY_TOKEN, STAGING_BTCPAY_TOKEN, PROD_BTCPAY_TOKEN } = process.env

export const getEnviromentBased_BTCPayWebHookToken = () => {
	switch (getEnviroment()) {
	case enviromentOptions.development:
		return DEV_BTCPAY_TOKEN
	case enviromentOptions.staging:
		return STAGING_BTCPAY_TOKEN
	case enviromentOptions.production:
		return PROD_BTCPAY_TOKEN
	default:
		return null
	}
}