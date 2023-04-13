import http from '../BTCPayAPI'
import { IcreateStore } from '../../interfaces'
import { webHookEventOptions } from '../../interfaces/webHookEventOptions'
import { getEnviromentBased_BTCPayWebHookSecret, getEnviromentBased_clientWebURL, getEnviromentBased_serverBaseURL } from '../../../functions'


const createStore = (data: IcreateStore) => {
	return http.post('/api/v1/stores', data)
}

const connectWalletToStore = (storeID: string, cryptoCode?: string) => {
	const chain = cryptoCode ? cryptoCode : 'BTC'
	return http.post(`/api/v1/stores/${storeID}/payment-methods/onchain/${chain}/generate`, {})
}

const updateStoreRateSettings = (storeId: string) => {
	return http.put(`/api/v1/stores/${storeId}/rates/configuration`, {
		spread: '10',
		preferredSource: 'CoinGecko',
		isCustomScript: false,
		effectiveScript: ''
	})
}

const getStores = () => {
	return http.get('/api/v1/stores')
}

const getInvoice = (storeID: string, invoiceID: string) => {
	return http.get(`/api/v1/stores/${storeID}/invoices/${invoiceID}`)
}

const getInvoices = (storeID: string) => {
	return http.get(`/api/v1/stores/${storeID}/invoices`)
}

const getInvoicePaymentMethods = (storeID: string, invoiceID: string) => {
	return http.get(`/api/v1/stores/${storeID}/invoices/${invoiceID}/payment-methods`)
}

const createInvoice = (storeID: string, amount: string) => {
	return http.post(`/api/v1/stores/${storeID}/invoices`, {
		currency: 'SEK',
		amount: amount,
		checkout: {
			redirectAutomatically: true,
			redirectURL: `${getEnviromentBased_clientWebURL()}/sell-order/store/${storeID}/invoice/{InvoiceId}`,
			/* 	notificationUrl: `${baseURL}/sell-order/store/{storeId}/invoice/{InvoiceId}`, //TODO: this is better in production. will avoid re-direct. */
		}
	})
}

const createWebHook = (storeID: string, endpoint: string, webHookEventOptions: Array<webHookEventOptions>) => {
	return http.post(`/api/v1/stores/${storeID}/webhooks`, {
		enabled: true,
		automaticRedelivery: true,
		url: getEnviromentBased_serverBaseURL() + endpoint,
		authorizedEvents: {
			everything: false,
			specificEvents: webHookEventOptions
		},
		secret: getEnviromentBased_BTCPayWebHookSecret()
	})
}

export default {
	getInvoicePaymentMethods,
	connectWalletToStore,
	createInvoice,
	createWebHook,
	getInvoices,
	createStore,
	getInvoice,
	getStores,
	updateStoreRateSettings
}