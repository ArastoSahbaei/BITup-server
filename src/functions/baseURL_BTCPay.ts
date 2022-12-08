import { isDevelopmentEnv } from './isDevelopmentEnv'

export const baseURL_BTCPay = () => {
	const PROD_baseURL = 'https://mainnet.demo.btcpayserver.org'
	const DEV_baseURL = 'https://testnet.demo.btcpayserver.org'
	return isDevelopmentEnv() ? DEV_baseURL : PROD_baseURL
}