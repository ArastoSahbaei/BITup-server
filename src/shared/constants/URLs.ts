import { EnviromentOptions } from '../interfaces'

export const webClientURL: EnviromentOptions = {
	development: 'http://localhost:3000',
	staging: 'http://localhost:3000',
	production: 'http://localhost:3000',
}

export const baseURLOptions: EnviromentOptions = {
	development: 'https://transbit-test.herokuapp.com', //does not exists
	staging: 'https://transbit-test.herokuapp.com',
	production: '', //TODO: correct this url
}