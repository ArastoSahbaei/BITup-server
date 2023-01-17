import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B' // The secret key provided by BTCPay Server
export const authenticateWebHook = (request, response, next) => {


	// Extract the signature from the headers
	const signature = request.headers['btcpay-sig']

	// Extract the payload from the body
	const payload = request.body

	// Compute the HMAC256 of the payload
	const hmac = crypto.createHmac('sha256', secret)
	hmac.update(payload)
	const computedSignature = hmac.digest('hex')

	// Compare the signature from the headers with the computed signature
	if (signature !== computedSignature) {
		console.log('Invalid signature')
		return request.status(401).send('Invalid signature')
	}

	console.log('this is the signature', signature)
	console.log('this is the payloadBytes', payload)

	next()

}