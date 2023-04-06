import { webClientURL } from '../shared/constants'
import { getEnviroment } from './getEnviroment'

export const getEnviromentBased_clientWebURL = () => {
	const { development, staging, production } = webClientURL
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
