import { Application } from 'express'
import BTCPayController from '../controllers/BTCPay.controller'

const routes = (application: Application) => {
	application.post('/btcpay/invoices', BTCPayController.getInvoices)
	application.post('/btcpay/invoices/create', BTCPayController.createInvoice)
	application.get('/btcpay/invoices/:storeID/:invoiceID', BTCPayController.getInvoice)
	application.get('/btcpay/store/:storeID/invoices/:invoiceID/payment-methods', BTCPayController.getInvoicePaymentMethods)
}

export default { routes }