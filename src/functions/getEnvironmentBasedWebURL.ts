import { webClientURL } from '../shared/constants/webClientURL'
import { getEnviroment } from './getEnviroment'

export const getEnvironmentBasedWebURL = () => {
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
