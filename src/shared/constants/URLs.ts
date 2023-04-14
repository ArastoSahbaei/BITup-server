import { EnviromentOptions } from '../interfaces'

export const webClientURL: EnviromentOptions = {
	development: 'http://localhost:3000',
	staging: 'http://localhost:3000',
	production: 'http://localhost:3000',
}

export const baseURLOptions: EnviromentOptions = {
	development: 'https://transbit-staging.herokuapp.com',
	staging: 'https://transbit-staging.herokuapp.com',
	production: '', //TODO: correct this url
}

export const BTCPayBaseURL: EnviromentOptions = {
	development: 'https://transbit-staging.herokuapp.com',
	staging: 'https://testnet.demo.btcpayserver.org',
	production: 'https://mainnet.demo.btcpayserver.org',
}

export const binanceBaseURL: EnviromentOptions = {
	development: 'https://testnet.binance.vision',
	staging: 'https://testnet.binance.vision',
	production: 'https://api.binance.com',
}