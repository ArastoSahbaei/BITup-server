import crypto from 'crypto'
import StatusCode from '../configurations/StatusCode'
import { getWebhookSecret } from '../functions'

const webhookSecret = getWebhookSecret()

export const authenticateWebHook = (request, response, next) => {
	const signatureHashAlg = 'sha256'
	const signatureHeaderName = 'BTCPAY-SIG'
	const signature: any = Buffer.from(request.get(signatureHeaderName) || '', 'utf8')
	const hmac = crypto.createHmac(signatureHashAlg, 'a4YthnHjwYJ8qjEzgA2w7pouq1B')
	const digest = Buffer.from(signatureHashAlg + '=' + hmac.update(request.rawBody).digest('hex'), 'utf8')
	const checksum = Buffer.from(signature, 'utf8')

	if (!request.get(signatureHeaderName)) {
		return response.status(StatusCode.UNAUTHORIZED).send({ message: 'missing signature' })
	}
	if (!request.rawBody) {
		return response.status(StatusCode.UNAUTHORIZED).send({ message: 'missing rawBody' })
	}
	if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
		return response.status(StatusCode.UNAUTHORIZED)
	}
	next()
}