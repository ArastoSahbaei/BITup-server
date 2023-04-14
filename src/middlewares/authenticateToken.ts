import jwt from 'jsonwebtoken'
import StatusCode from '../configurations/StatusCode'
import { getEnviromentBased_authenticationSecret } from '../functions'

export const authenticateToken = (request, response, next) => {
	const authHeader = request.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) {
		return response.sendStatus(StatusCode.UNAUTHORIZED)
	}

	jwt.verify(token, getEnviromentBased_authenticationSecret() as string, (error: any, user: any) => {
		if (error) {
			return response.sendStatus(StatusCode.FORBIDDEN)
		}
		request.user = user
		next()
	})
}