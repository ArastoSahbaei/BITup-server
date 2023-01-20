import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

const secret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'

export const authenticateWebHook = (request, response, next) => {
	/* 	const payload = request.body
		const payloadBytes = Buffer.from(JSON.stringify(payload), 'utf8')
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
		} */



	const sigHashAlg = 'sha256'
	const sigHeaderName = 'BTCPAY-SIG'
	const webhookSecret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'
	const payload = request.body
	const payloadBytes = Buffer.from(JSON.stringify(payload), 'utf8')

	if (payload) {
		console.log('Request body empty')
		/* return next('Request body empty') */
	}
	const sig = Buffer.from(request.get(sigHeaderName) || '', 'utf8')
	const hmac = crypto.createHmac(sigHashAlg, webhookSecret)
	const digest = Buffer.from(sigHashAlg + '=' + hmac.update(JSON.stringify(payload)).digest('hex'), 'utf8')
	const checksum = Buffer.from(sig)
	if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
		console.log(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`)
	}
	else {
		// Do More Stuff here
		console.log('Request body was signed')
		response.status(200).send('Request body was signed')
	}


}