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
	const dataQueryString = `symbol=BTCUSDT&side=SELL&type=MARKET&quantity=${quantity}&recvWindow=60000&${getTimeStamp()}`
	return http.post(`/api/v3/order?${dataQueryString + signatureSHA256(dataQueryString)}`)
}

export default {
	test,
	createTrade,
	getAccountInformation,
}

//TODO: 1. Get the current price of the coin
//TODO: 2. Create a sell order at 1% below the current price
//TODO: 3. Return the order id
//TODO: 4. Create a function to check the status of the order
//TODO: 5. Create a function to cancel the order
//TODO: 6. Create a function to get the order history