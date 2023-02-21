import StatusCode from '../../configurations/StatusCode'
import { baseURL_BTCPay } from '../../functions'
import BTCPayService from '../../shared/api/services/BTCPayService'
import InvoiceModel from '../models/Invoice.model'

const getInvoice = async (request, response) => {
	try {
		const { data } = await BTCPayService.getInvoice(request.params.storeID, request.params.invoiceID)
		console.log(data)
		response.status(StatusCode.OK).send({ message: data })
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getInvoices = async (request, response) => {
	const { storeID } = request.body
	try {
		const { data } = await BTCPayService.getInvoices(storeID)
		return response.status(StatusCode.OK).send(data)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const createInvoice = async (request, response) => {
	const { storeID, amount } = request.body
	try {
		const { data } = await BTCPayService.createInvoice(storeID, amount)
		const invoice = new InvoiceModel({
			'btcpay.invoiceId': data.id,
			BTCPAY_storeId: data.storeId,
			BTCPAY_invoiceId: data.id,
			amount_fiat: data.amount,
			status: data.status,
			currency: data.currency,
			checkoutLink: data.checkoutLink,
			receiptLink: `${baseURL_BTCPay()}/i/${data.id}/receipt`
		})
		await invoice.save()
		return response.status(StatusCode.CREATED).send(data)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getInvoicePaymentMethods = async (request, response) => {
	const { storeID, invoiceID } = request.params
	try {
		const { data } = await BTCPayService.getInvoicePaymentMethods(storeID, invoiceID)
		return response.status(StatusCode.OK).send(data)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	getInvoice,
	getInvoices,
	createInvoice,
	getInvoicePaymentMethods
}