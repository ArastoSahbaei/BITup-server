import Axios from 'axios'
import { getEnviromentBased_binanceBaseURL, getEnviromentBased_binanceSecret } from '../../functions'

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': getEnviromentBased_binanceSecret()
}

const BinanceAPI = Axios.create({
	baseURL: getEnviromentBased_binanceBaseURL(),
	headers: headers
})

export default BinanceAPI