import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'

export const authenticateWebHook = (request, response, next) => {
	const payload = request.body
	const payloadBytes = Buffer.from(payload, 'utf8')
	const hmac = crypto.createHmac('sha256', secret).update(payloadBytes).digest('hex')
	const btcpaySignature = request.headers['btcpay-sig']

	console.log(payloadBytes)
	console.log(hmac + ' + ' + btcpaySignature)

	if (hmac === btcpaySignature) {
		console.log('Payload is valid!')
		return response.sendStatus(StatusCode.OK)
	} else {
		console.log('Invalid payload!')
		return response.sendStatus(StatusCode.UNAUTHORIZED)

	}
}