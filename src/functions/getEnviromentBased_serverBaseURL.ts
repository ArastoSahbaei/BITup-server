import { getEnviroment } from './getEnviroment'
import { baseURLOptions } from '../shared/constants'

export const getEnviromentBased_serverBaseURL = () => {
	const { development, staging, production } = baseURLOptions
	console.log('@@@@@#######!!YOU ARE IN: ', getEnviroment())
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