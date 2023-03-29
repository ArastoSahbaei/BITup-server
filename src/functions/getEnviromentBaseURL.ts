import { isDevelopmentEnv } from './isDevelopmentEnv'

//TODO: seperate to a constans file and import it. also add datatypes
const baseURLOptions = {
	production: '', //TODO: correct this url
	staging: 'https://transbit-test.herokuapp.com',
	development: 'https://transbit-test.herokuapp.com', //does not exists
}

export const getEnviromentBaseURL = () => {
	const environment = isDevelopmentEnv() ? 'staging' : 'production'
	return baseURLOptions[environment]
}