import http from '../BTCPayAPI'
import { IcreateStore } from '../../interfaces'

const createStore = (data: IcreateStore) => {
	return http.post('/api/v1/stores', { data })
}

const getStores = () => {
	return http.get('/api/v1/stores')
}

const createInvoice = (storeID: string, amount: string) => {
	return http.post(`/api/v1/stores/${storeID}/invoices`, {
		currency: 'SEK',
		amount: amount,
		checkout: {
			defaultLanguage: 'sv'
		}
	})
}

export default {
	createStore,
	getStores,
	createInvoice
}