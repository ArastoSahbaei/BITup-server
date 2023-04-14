import Axios from 'axios'
import { getEnviromentBased_binanceAPIToken, getEnviromentBased_binanceBaseURL } from '../../functions'

const headers = {
	'Content-Type': 'application/json',
	'X-MBX-APIKEY': getEnviromentBased_binanceAPIToken()
}

const BinanceAPI = Axios.create({
	baseURL: getEnviromentBased_binanceBaseURL(),
	headers: headers
})

export default BinanceAPI