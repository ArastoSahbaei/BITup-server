import Axios from 'axios'
import dotenv from 'dotenv'
import { getEnviromentBased_BTCPayBaseURL, isDevelopmentEnv } from '../../functions'

dotenv.config()
const { DEV_BTCPAY_TOKEN, PROD_BTCPAY_TOKEN } = process.env

const token = () => {
	return isDevelopmentEnv() ? DEV_BTCPAY_TOKEN : PROD_BTCPAY_TOKEN
}

const BitupAPI = Axios.create({
	baseURL: getEnviromentBased_BTCPayBaseURL(),
	headers: {
		'Authorization': `token ${token()}`
	}
})

export default BitupAPI