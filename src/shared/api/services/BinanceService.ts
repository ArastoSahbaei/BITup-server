import http from '../BinanceAPI'
import { signatureSHA256 } from '../../../functions'


const dataQueryString = 'recvWindow=20000&timestamp=' + Date.now()


const test = () => {
	return http.get('/api/v3/ping')
}

const getAccountInformation = () => {
	const dataQueryString = 'recvWindow=20000&timestamp=' + Date.now()
	return http.get('/api/v3/account?' + dataQueryString + signatureSHA256(dataQueryString))
}

const createSellOrder = () => {
	//TODO: 1. Get the current price of the coin
	//TODO: 2. Create a sell order at 1% below the current price
	//TODO: 3. Return the order id
	//TODO: 4. Create a function to check the status of the order
	//TODO: 5. Create a function to cancel the order
	//TODO: 6. Create a function to get the order history
}

export default {
	test,
	getAccountInformation
}