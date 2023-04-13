import Axios from 'axios'
import { getEnviromentBased_BTCPayBaseURL, getEnviromentBased_BTCPayWebHookToken } from '../../functions'

const BTCPayAPI = Axios.create({
	baseURL: getEnviromentBased_BTCPayBaseURL(),
	headers: {
		'Authorization': `token ${getEnviromentBased_BTCPayWebHookToken()}`
	}
})

export default BTCPayAPI