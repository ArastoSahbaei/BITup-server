import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const { TOKEN_SECRET } = process.env

export const generateAccessToken = (email: string) => {
	return jwt.sign({ email: email }, TOKEN_SECRET, { expiresIn: '1h' })
}