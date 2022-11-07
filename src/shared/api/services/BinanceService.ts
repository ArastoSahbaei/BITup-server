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

export default {
	test,
}