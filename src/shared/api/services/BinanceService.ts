import http from '../BinanceAPI'
import CryptoJS from 'crypto-js'

const endPoint = '/api/v3/ping'
const dataQueryString = 'recvWindow=20000&timestamp=' + Date.now()
const secret = '62118747723bd91218d516a782214f0131f53e811cbdaf248dbe3055d22f3016'

const signature = CryptoJS.HmacSHA256(dataQueryString, secret).toString(CryptoJS.enc.Hex)

const url = endPoint + '?' + dataQueryString + '&signature=' + signature


const test = () => {
	return http.get(endPoint)
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
}