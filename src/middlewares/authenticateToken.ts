import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import StatusCode from '../configurations/StatusCode'

dotenv.config()
const { TOKEN_SECRET } = process.env

export const authenticateToken = (request, response, next) => {
	const authHeader = request.headers.authorization
	console.log('authHeader', authHeader)
	const token = authHeader && authHeader.split(' ')[1]
	console.log('token', token)
	if (token == null) {
		return response.sendStatus(StatusCode.UNAUTHORIZED)
	}

	jwt.verify(token, TOKEN_SECRET as string, (error: any, user: any) => {
		if (error) {
			return response.sendStatus(StatusCode.FORBIDDEN)
		}
		request.user = user
		next()
	})
}