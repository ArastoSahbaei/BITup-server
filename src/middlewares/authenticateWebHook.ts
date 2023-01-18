import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

export const authenticateWebHook = (request, response, next) => {

	const payload = JSON.stringify(request.body)
	const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'
	const signature = request.headers['btcpay-sig']
	const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex')

	if (hmac === signature) {
		console.log('Payload is valid!')
		return response.sendStatus(StatusCode.OK)
	} else {
		console.log('Invalid payload!')
		return response.sendStatus(StatusCode.UNAUTHORIZED)

	}
}