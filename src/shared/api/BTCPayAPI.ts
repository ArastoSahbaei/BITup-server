import Axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const { ENVIROMENT, BTCPay_PROD_TOKEN, BTCPay_DEV_TOKEN } = process.env

const baseURL = () => {
	const baseURLPROD = 'https://mainnet.demo.btcpayserver.org'
	const baseURLDEV = 'https://testnet.demo.btcpayserver.org'
	return ENVIROMENT === 'DEVELOPMENT'
		? baseURLDEV
		: baseURLPROD
}

const token = () => {
	return ENVIROMENT === 'DEVELOPMENT'
		? BTCPay_DEV_TOKEN
		: BTCPay_PROD_TOKEN
}

const BitupAPI = Axios.create({
	baseURL: baseURL(),
	headers: {
		'Authorization': `token ${token()}`
	}
})

export default BitupAPI