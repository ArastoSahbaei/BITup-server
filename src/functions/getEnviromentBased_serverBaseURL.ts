import { getEnviroment } from './getEnviroment'
import { baseURLOptions, enviromentOptions } from '../shared/constants'

export const getEnviromentBased_serverBaseURL = () => {
	const { development, staging, production } = baseURLOptions
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