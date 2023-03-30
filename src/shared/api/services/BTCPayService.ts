import http from '../BTCPayAPI'
import dotenv from 'dotenv'
import { IcreateStore } from '../../interfaces'
import { getEnviromentBaseURL, getWebhookSecret, isDevelopmentEnv } from '../../../functions'

dotenv.config()
const { DEV_WEB_URL, PROD_WEB_URL } = process.env
const baseURL = isDevelopmentEnv() ? DEV_WEB_URL : PROD_WEB_URL

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
			redirectURL: `${baseURL}/sell-order/store/${storeID}/invoice/{InvoiceId}`,
			/* 	notificationUrl: `${baseURL}/sell-order/store/{storeId}/invoice/{InvoiceId}`, //TODO: this is better in production. will avoid re-direct. */
		}
	})
}

//TODO: for this to be generic the event types need to be dynamic.
//TODO: add datatype for event types.
const createWebHook = (storeID: string, endpoint: string) => {
	const x = getWebhookSecret()
	console.log('getWebhookSecret()', x)
	return http.post(`/api/v1/stores/${storeID}/webhooks`, {
		id: 'my-webhook-id', //TODO: is this required?
		enabled: true,
		automaticRedelivery: true,
		url: getEnviromentBaseURL() + endpoint, //TODO: Make generic + baseURL?
		//TODO: make this generic so this can be used for other events as well.
		authorizedEvents: {
			InvoiceCreated: true,
			InvoiceReceivedPayment: true,
			InvoiceProcessing: true,
			InvoiceExpired: true,
			InvoiceSettled: true,
			InvoiceInvalid: true,
		},
		secret: getWebhookSecret()
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