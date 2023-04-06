import Axios from 'axios'
import dotenv from 'dotenv'
import { getEnviromentBased_BTCPayBaseURL, isDevelopmentEnv } from '../../functions'

dotenv.config()
const { DEV_BTCPAY_TOKEN, PROD_BTCPAY_TOKEN } = process.env

const token = () => {
	return isDevelopmentEnv() ? DEV_BTCPAY_TOKEN : PROD_BTCPAY_TOKEN
}

const baseURL = getEnviromentBased_BTCPayBaseURL()
console.log('Base URL:', baseURL)

const BitupAPI = Axios.create({
	baseURL: baseURL,
	headers: {
		'Authorization': `token ${token()}`
	}
})

export default BitupAPI