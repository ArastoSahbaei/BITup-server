import Axios from 'axios'
import dotenv from 'dotenv'
import { isDevelopmentEnv } from '../../functions'

dotenv.config()
const { BINANCE_DEV_TOKEN, BINANCE_PROD_TOKEN } = process.env

const baseURL = () => {
	const baseURL_PROD = 'https://api.binance.com/api'
	const baseURL_DEV = 'https://testnet.binance.vision'
	return isDevelopmentEnv() ? baseURL_DEV : baseURL_PROD
}

const token = () => {
	return isDevelopmentEnv() ? BINANCE_DEV_TOKEN : BINANCE_PROD_TOKEN
}

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': token()
}

const BinanceAPI = Axios.create({
	baseURL: baseURL(),
	headers: headers
})


export default BinanceAPI