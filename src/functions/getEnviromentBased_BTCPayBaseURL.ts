import { BTCPayBaseURL, enviromentOptions } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

export const getEnviromentBased_BTCPayBaseURL = () => {
	const { development, staging, production } = BTCPayBaseURL
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
