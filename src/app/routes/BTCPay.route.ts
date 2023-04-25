import { endpoints } from './endpoints'
import { Application } from 'express'
import BTCPayController from '../controllers/BTCPay.controller'

const {
	getInvoices,
	createInvoice,
	getInvoice,
	getInvoicePaymentMethods
} = endpoints.BTCPay

const routes = (application: Application) => {
	application.post(getInvoices, BTCPayController.getInvoices)
	application.post(createInvoice, BTCPayController.createInvoice)
	application.get(getInvoice, BTCPayController.getInvoice)
	application.get(getInvoicePaymentMethods, BTCPayController.getInvoicePaymentMethods)
}

export default { routes }