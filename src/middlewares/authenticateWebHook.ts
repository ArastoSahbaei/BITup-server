import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

export const authenticateWebHook = (request, response, next) => {



	const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'
	// The payload from the callback
	const payload = request.body

	// The signature header from the callback
	const signatureHeader = 'btcpay-sig'
	const signature = request.headers[signatureHeader]

	// Create a HMAC using the payload and secret
	const hmac = crypto.createHmac('sha256', secret)
		.update(payload)
		.digest('hex')
	// Compare the signature from the callback with the generated HMAC
	if (hmac === signature) {
		console.log('Payload is valid!')
		return response.sendStatus(StatusCode.OK)
	} else {
		console.log('Invalid payload!')
		return response.sendStatus(StatusCode.UNAUTHORIZED)

	}
}