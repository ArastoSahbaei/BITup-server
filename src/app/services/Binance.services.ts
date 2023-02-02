import BTCPayService from '../../shared/api/services/BTCPayService'
import InvoiceModel from '../models/Invoice.model'
import { invoiceStatus } from '../../shared/enums'
import BinanceService from '../../shared/api/services/BinanceService'

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
		const databaseResponse = await InvoiceModel.findOne({ BTCPAY_invoiceId: invoiceId })
		console.log('databaseResponse: ', databaseResponse)
		const isAlreadySettled = databaseResponse.status === invoiceStatus.settled
		console.log('isAlreadySettled: ', isAlreadySettled)
		return isAlreadySettled
	} catch (error) {
		console.log(error)
		return false
	}
}

export const getInvoicePaymentMethods = async (storeId: string, invoiceId: string) => {
	//TODO: Why does invoiceResponse return an array? Shouldn't it return a single object? in what scenarios does it return multiple objects?
	try {
		const invoice = await BTCPayService.getInvoicePaymentMethods(storeId, invoiceId)
		return invoice
	} catch (error) {
		console.log(error)
		return false
	}
}

export const updateInvoiceStatus = async (invoiceId: string, status: string) => {
	try {
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ BTCPay_invoiceId: invoiceId }, { status: status })
		return !!databaseResponse
	} catch (error) {
		console.log(error)
		return false
	}
}

export const getRoundedDecimals = (amount: number) => {
	return Math.round(amount * 1000) / 1000
}

export const createNewSellOrder = async (amount: number) => {
	try {
		const { data } = await BinanceService.createTrade(amount.toString())
		return data
	} catch (error) {
		console.log(error)
		return false
	}
}
