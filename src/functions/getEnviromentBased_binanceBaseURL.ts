import { binanceBaseURL, enviromentOptions } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

export const getEnviromentBased_binanceBaseURL = () => {
	const { development, staging, production } = binanceBaseURL
	switch (getEnviroment()) {
	case enviromentOptions.development:
		return development
	case enviromentOptions.staging:
		return staging
	case enviromentOptions.production:
		return production
	default:
		return null
	}
}