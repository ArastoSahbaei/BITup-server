import http from '../BTCPayAPI'
import dotenv from 'dotenv'
import { IcreateStore } from '../../interfaces'
import { isDevelopmentEnv } from '../../../functions'

dotenv.config()
const { DEV_WEB_URL, PROD_WEB_URL } = process.env
const baseURL = isDevelopmentEnv() ? DEV_WEB_URL : PROD_WEB_URL

const createStore = (data: IcreateStore) => {
	return http.post('/api/v1/stores', data)
}

const connectWalletToStore = (storeID: string, cryptoCode?: string) => {
	const chain = cryptoCode ? cryptoCode : 'BTC'
	return http.post(`/api/v1/stores/${storeID}/payment-methods/onchain/${chain}/generate`)
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

export default {
	getInvoicePaymentMethods,
	connectWalletToStore,
	createInvoice,
	getInvoices,
	createStore,
	getInvoice,
	getStores,
}