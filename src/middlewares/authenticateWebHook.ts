import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

export const authenticateWebHook = (request, response, next) => {
	console.log('request.headers', request.headers['btcpay-sig'])

	const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'
	const payload = request.body
	/* const signature = request.headers['btcpay-sig'] */
	const hmac = crypto.createHmac('sha256', secret)
		.update(request.body)
		.digest('hex')
	// Compare the signature from the callback with the generated HMAC
	if (hmac === 'signature') {
		console.log('Payload is valid!')
		return response.sendStatus(StatusCode.OK)
	} else {
		console.log('Invalid payload!')
		return response.sendStatus(StatusCode.UNAUTHORIZED)

	}
}