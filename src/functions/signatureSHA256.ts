import dotenv from 'dotenv'
import CryptoJS from 'crypto-js'

dotenv.config()
const { DEV_BINANCE_SECRET } = process.env

export const signatureSHA256 = (query: string) => {
	const signature = CryptoJS.HmacSHA256(query, DEV_BINANCE_SECRET).toString(CryptoJS.enc.Hex)
	return `&signature=${signature}`

}