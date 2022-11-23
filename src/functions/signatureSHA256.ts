import dotenv from 'dotenv'
import CryptoJS from 'crypto-js'
import { isDevelopmentEnv } from './isDevelopmentEnv'

dotenv.config()
const { DEV_BINANCE_SECRET, PROD_BINANCE_SECRET } = process.env
const env = isDevelopmentEnv() ? DEV_BINANCE_SECRET : PROD_BINANCE_SECRET

export const signatureSHA256 = (query: string) => {
	const signature = CryptoJS.HmacSHA256(query, env).toString(CryptoJS.enc.Hex)
	return `&signature=${signature}`

}