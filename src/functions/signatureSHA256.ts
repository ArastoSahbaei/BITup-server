import CryptoJS from 'crypto-js'
import { getEnviromentBased_binanceSecret } from './getEnviromentBased_binanceSecret'

const binanceEnviromentSecret = getEnviromentBased_binanceSecret()
export const signatureSHA256 = (query: string) => {
	const signature = CryptoJS.HmacSHA256(query, binanceEnviromentSecret).toString(CryptoJS.enc.Hex)
	return `&signature=${signature}`

}