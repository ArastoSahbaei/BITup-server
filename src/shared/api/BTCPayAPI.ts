import Axios from 'axios'
import dotenv from 'dotenv'
import { isDevelopmentEnv } from '../../functions'

dotenv.config()
const { DEV_BTCPAY_TOKEN, PROD_BTCPAY_TOKEN } = process.env

const baseURL = () => {
	const PROD_baseURL = 'https://mainnet.demo.btcpayserver.org'
	const DEV_baseURL = 'https://testnet.demo.btcpayserver.org'
	return isDevelopmentEnv() ? DEV_baseURL : PROD_baseURL
}

const token = () => {
	return isDevelopmentEnv() ? DEV_BTCPAY_TOKEN : PROD_BTCPAY_TOKEN
}

const BitupAPI = Axios.create({
	baseURL: baseURL(),
	headers: {
		'Authorization': `token ${token()}`
	}
})

export default BitupAPI