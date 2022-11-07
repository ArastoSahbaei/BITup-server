import Axios from 'axios'
import { determineEnviroment } from '../../functions'

const baseURL = () => {
	const baseURL_PROD = 'TBD'
	const baseURL_DEV = 'https://testnet.binance.vision'
	return determineEnviroment() ? baseURL_DEV : baseURL_PROD
}

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': '6558cca0f3e4cf530c1375b639e459fe8e013dfcfdac37a8db7cb8f59aa98d26'
}

const BinanceAPI = Axios.create({
	baseURL: 'https://testnet.binance.vision',
	headers: headers
})


export default BinanceAPI