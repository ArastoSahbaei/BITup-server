import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B' // The secret key provided by BTCPay Server
export const authenticateWebHook = (request, response, next) => {

	const payload = request.body
	const signature = request.headers['btcpay-sig'] // The BTCPAY-SIG header
	const payloadBytes = JSON.stringify(payload) // Stringify payload to bytes
	const btcpaySigWithoutAlgo = signature.split('=')[1] // remove the algorithm prefix

	console.log('this is the payload', payload)
	console.log('this is the payloadBytes', payloadBytes)
	const calculatedSig = crypto.createHmac('sha256', secret).update(payloadBytes).digest('hex')
	console.log(calculatedSig + ' + ' + btcpaySigWithoutAlgo)
	if (calculatedSig !== btcpaySigWithoutAlgo) {
		console.log('UNAUTHORIZED')
		return response.sendStatus(StatusCode.UNAUTHORIZED)
	}
	return response.sendStatus(StatusCode.OK)
	// The signature matches, the payload is valid
	// Your code to handle the webhook payload goes here
	// ...
	/* 	next() */

}