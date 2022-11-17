import dotenv from 'dotenv'
import CryptoJS from 'crypto-js'

dotenv.config()
const { BINANCE_DEV_SECRET } = process.env

export const signatureSHA256 = (query: string) => {
	const signature = CryptoJS.HmacSHA256(query, BINANCE_DEV_SECRET).toString(CryptoJS.enc.Hex)
	return `&signature=${signature}`

}