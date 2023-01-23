import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'

export const authenticateWebHook = (request, response, next) => {
	const sigHashAlg = 'sha256'
	const sigHeaderName = 'BTCPAY-SIG'
	const webhookSecret = 'a4YthnHjwYJ8qjEzgA2w7pouq1B'
	const sig: any = Buffer.from(request.get(sigHeaderName) || '', 'utf8')
	const hmac = crypto.createHmac(sigHashAlg, webhookSecret)
	const digest = Buffer.from(sigHashAlg + '=' + hmac.update(request.rawBody).digest('hex'), 'utf8')
	const checksum = Buffer.from(sig, 'utf8')

	if (!request.rawBody) {
		return response.status(StatusCode.UNAUTHORIZED).send({ message: 'missing rawBody' })
	}
	if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
		return response.status(StatusCode.UNAUTHORIZED)
	}
	next()
}