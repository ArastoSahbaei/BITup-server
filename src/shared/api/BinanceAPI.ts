import Axios from 'axios'
import dotenv from 'dotenv'
import { isDevelopmentEnv } from '../../functions'

dotenv.config()
const { BINANCE_DEV_TOKEN } = process.env

const baseURL = () => {
	const baseURL_PROD = 'TBD'
	const baseURL_DEV = 'https://testnet.binance.vision'
	return isDevelopmentEnv() ? baseURL_DEV : baseURL_PROD
}

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': BINANCE_DEV_TOKEN
}

const BinanceAPI = Axios.create({
	baseURL: baseURL(),
	headers: headers
})


export default BinanceAPI