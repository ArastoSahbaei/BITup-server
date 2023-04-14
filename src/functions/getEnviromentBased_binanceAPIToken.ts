import dotenv from 'dotenv'
import { enviromentOptions } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

dotenv.config()
const { DEV_BINANCE_TOKEN, STAGING_BINANCE_TOKEN, PROD_BINANCE_TOKEN } = process.env

export const getEnviromentBased_binanceAPIToken = () => {
	switch (getEnviroment()) {
	case enviromentOptions.development:
		return DEV_BINANCE_TOKEN
	case enviromentOptions.staging:
		return STAGING_BINANCE_TOKEN
	case enviromentOptions.production:
		return PROD_BINANCE_TOKEN
	default:
		return null
	}
}