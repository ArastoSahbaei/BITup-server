import { enviromentOptions } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

export const getEnviromentBased_binanceSecret = () => {
	const { DEV_BINANCE_SECRET, STAGING_BINANCE_SECRET, PROD_BINANCE_SECRET } = process.env

	switch (getEnviroment()) {
	case enviromentOptions.development:
		return DEV_BINANCE_SECRET
	case enviromentOptions.staging:
		return STAGING_BINANCE_SECRET
	case enviromentOptions.production:
		return PROD_BINANCE_SECRET
	default:
		return null
	}
}