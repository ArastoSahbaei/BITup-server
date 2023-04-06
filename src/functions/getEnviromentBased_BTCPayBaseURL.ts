import { BTCPayBaseURL } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

export const getEnviromentBased_BTCPayBaseURL = () => {
	const { development, staging, production } = BTCPayBaseURL
	switch (getEnviroment()) {
	case development:
		return development
	case staging:
		return staging
	case production:
		return production
	default:
		return null
	}
}
