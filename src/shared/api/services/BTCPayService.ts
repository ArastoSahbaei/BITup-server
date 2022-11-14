import http from '../BTCPayAPI'
import { IcreateStore } from '../../interfaces'

const createStore = (data: IcreateStore) => {
	return http.post('/api/v1/stores', data)
}

const connectWalletToStore = (storeID: string, cryptoCode?: string) => {
	const chain = cryptoCode ? cryptoCode : 'BTC'
	return http.post(`/api/v1/stores/${storeID}/payment-methods/onchain/${chain}/generate`, {})
}

const getStores = () => {
	return http.get('/api/v1/stores')
}

const getInvoices = (storeID: string) => {
	return http.get(`/api/v1/stores/${storeID}/invoices`)
}

const createInvoice = (storeID: string, amount: string) => {
	return http.post(`/api/v1/stores/${storeID}/invoices`, {
		currency: 'SEK',
		amount: amount,
		checkout: {
			defaultLanguage: 'sv',
			redirectAutomatically: true,
			redirectURL: 'https://bitup.se/{InvoiceId}/{OrderId}'
		}
	})
}

export default {
	createStore,
	getStores,
	connectWalletToStore,
	createInvoice,
	getInvoices
}