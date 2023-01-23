import { application } from '../../Server'
import { getWebhookSecret } from '../functions'
import crypto from 'crypto'
import express from 'express'
import StatusCode from '../configurations/StatusCode'


export const authenticateWebHook = (request, response, next) => {
	const webhookSecret = getWebhookSecret()
	application.use(express.json({
		verify: (request: any, response, buffer) => {
			request.rawBody = buffer
		}
	}))

	const signatureHashAlg = 'sha256'
	const signatureHeaderName = 'BTCPAY-SIG'
	const signature: any = Buffer.from(request.get(signatureHeaderName) || '', 'utf8')
	const hmac = crypto.createHmac(signatureHashAlg, webhookSecret)
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