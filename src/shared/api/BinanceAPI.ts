import Axios from 'axios'
import dotenv from 'dotenv'
import { isDevelopmentEnv } from '../../functions'

dotenv.config()
const { DEV_BINANCE_TOKEN, PROD_BINANCE_TOKEN } = process.env

const baseURL = () => {
	const baseURL_PROD = 'https://api.binance.com'
	const baseURL_DEV = 'https://testnet.binance.vision'
	return isDevelopmentEnv() ? baseURL_DEV : baseURL_PROD
}

const getBinanceSecretToken = () => {
	return isDevelopmentEnv() ? DEV_BINANCE_TOKEN : PROD_BINANCE_TOKEN
}

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': getBinanceSecretToken()
}

const BinanceAPI = Axios.create({
	baseURL: baseURL(),
	headers: headers
})


export default BinanceAPI



/* import Axios from 'axios'
import { getEnviromentBased_binanceBaseURL, getEnviromentBased_binanceSecret } from '../../functions'

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': getEnviromentBased_binanceSecret()
}

const BinanceAPI = Axios.create({
	baseURL: getEnviromentBased_binanceBaseURL(),
	headers: headers
})

export default BinanceAPI */