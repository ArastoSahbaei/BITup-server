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
	const params = {
		symbol: 'BTCUSDT',
		side: 'SELL',
		type: 'MARKET',
		quantity: quantity,
		timestamp: Date.now()
	}

	const queryString = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
		.join('&')
	console.log(queryString)
	/* 	const dataQueryString = `symbol=BTCUSDT&side=SELL&type=MARKET&quantity=${quantity}&recvWindow=60000&${getTimeStamp()}` */
	return http.post(`/api/v3/order?${queryString + signatureSHA256(queryString)}`)
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