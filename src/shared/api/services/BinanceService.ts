import http from '../BinanceAPI'
import { signatureSHA256 } from '../../../functions'
import { getTimeStamp } from '../../../functions/getTimeStamp'

const test = () => {
	return http.get('/api/v3/ping')
}

const getAccountInformation = () => {
	const dataQueryString = `recvWindow=60000&${getTimeStamp()}`
	return http.get(`/api/v3/account?${dataQueryString + signatureSHA256(dataQueryString)}`)
}

const createTrade = (quantity: string) => {
	const dataQueryString = `symbol=BTCSEK&side=SELL&type=MARKET&quantity=${quantity}&recvWindow=60000&${getTimeStamp()}`
	return http.post(`/api/v3/order?${dataQueryString + signatureSHA256(dataQueryString)}`)
}

const getPrice = () => {
	return http.get('/api/v3/ticker/price?symbol=BTCUSDT')
}

export default {
	test,
	createTrade,
	getAccountInformation,
	getPrice,
}