import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const { BCRYPT_SALT_ROUNDS } = process.env

export const encryptPassword = (password: string) => {
	const hashedPassword = bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
	return hashedPassword
}