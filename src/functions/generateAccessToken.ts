import jwt from 'jsonwebtoken'
import { getEnviromentBased_authenticationSecret } from './getEnviromentBased_authenticationSecret'

export const generateAccessToken = (email: string) => {
	return jwt.sign({ email: email }, getEnviromentBased_authenticationSecret(), { expiresIn: '1h' })
}