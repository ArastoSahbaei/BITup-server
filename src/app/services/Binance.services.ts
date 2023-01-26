import BTCPayService from '../../shared/api/services/BTCPayService'
import { invoiceStatus } from '../../shared/enums'
import InvoiceModel from '../models/Invoice.model'

export const validateInvoice = async (storeId: string, invoiceId: string) => {
	try {
		const invoice = await BTCPayService.getInvoice(storeId, invoiceId)
		const isInvoiceLegitimate: boolean = invoice.data.status === invoiceStatus.settled || invoice.data.status === invoiceStatus.inProcess
		return isInvoiceLegitimate
	} catch (error) {
		console.log(error)
		return false
	}
}

export const checkTransactionHistory = async (invoiceId: string) => {
	//TODO: test this function
	try {
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceId }, { status: invoiceStatus.settled })
		const isAlreadySettled = databaseResponse.status === invoiceStatus.settled
		return isAlreadySettled
	} catch (error) {
		console.log(error)
		return false
	}
}