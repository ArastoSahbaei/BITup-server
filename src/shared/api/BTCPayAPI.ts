import Axios from 'axios'

const token = 'a8a0eef0e5c8ad48972d0fa5e43fe1a3b57f494c'
const baseURL = 'https://mainnet.demo.btcpayserver.org'
const BitupAPI = Axios.create({
	baseURL: baseURL,
	headers: {
		'Authorization': `token ${token}`
	}
})

export default BitupAPI