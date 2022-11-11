import Axios from 'axios'
import dotenv from 'dotenv'
import { isDevelopmentEnv } from '../../functions'

dotenv.config()
const { BTCPay_DEV_TOKEN, BTCPay_PROD_TOKEN } = process.env

const baseURL = () => {
	const baseURLPROD = 'https://mainnet.demo.btcpayserver.org'
	const baseURLDEV = 'https://testnet.demo.btcpayserver.org'
	return isDevelopmentEnv() ? baseURLDEV : baseURLPROD
}

const token = () => {
	return isDevelopmentEnv() ? BTCPay_DEV_TOKEN : BTCPay_PROD_TOKEN
}

const BitupAPI = Axios.create({
	baseURL: baseURL(),
	headers: {
		'Authorization': `token ${token()}`
	}
})

export default BitupAPI