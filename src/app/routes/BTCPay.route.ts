import { Application } from 'express'
import BTCPayController from '../controllers/BTCPay.controller'

const routes = (application: Application) => {
	application.post('/btcpay/invoices', BTCPayController.getInvoices)
}

export default { routes }