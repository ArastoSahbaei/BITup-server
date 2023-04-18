import InvoiceModel from '../models/Invoice.model'
import BTCPayService from '../../shared/api/services/BTCPayService'
import BinanceService from '../../shared/api/services/BinanceService'
import { invoiceStatus } from '../../shared/enums'

export const validateInvoice = async (storeId: string, invoiceId: string) => {
	try {
		const invoice = await BTCPayService.getInvoice(storeId, invoiceId)
		const isInvoiceLegitimate: boolean = invoice.data.status === invoiceStatus.settled || invoice.data.status === invoiceStatus.inProcess
		return isInvoiceLegitimate
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const checkTransactionHistory = async (invoiceId: string) => {
	//TODO: test this function
	try {
		const databaseResponse = await InvoiceModel.findOne({ 'btcpay.invoiceId': invoiceId })
		console.log('databaseResponse: ', databaseResponse)
		const isAlreadySettled = databaseResponse.status === invoiceStatus.settled
		console.log('isAlreadySettled: ', isAlreadySettled)
		return isAlreadySettled
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const getInvoicePaymentMethods = async (storeId: string, invoiceId: string) => {
	//TODO: Why does invoiceResponse return an array? Shouldn't it return a single object? in what scenarios does it return multiple objects?
	try {
		const invoice = await BTCPayService.getInvoicePaymentMethods(storeId, invoiceId)
		return invoice
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const updateInvoiceStatus = async (invoiceId: string, status: string) => {
	try {
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ 'btcpay.invoiceId': invoiceId }, { status: status })
		return !!databaseResponse
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const getRoundedDecimals = (amount: number) => {
	return Math.round(amount * 10000) / 10000
}

export const calculcateSellingPrice = (satoshis: number, amountSEK: number) => {
	/* How many SEK do i need from selling amount ? and then calculcate the exchange rate required to make that happend. */
}

export const createNewSellOrder = async (amount: number) => {
	try {
		//TODO: Ensure that the amount is not sold for less than required, but higher is ok.
		console.log('THIS IS THE AMOUNT:', amount)
		const { data } = await BinanceService.createTrade(amount.toString(), 20000) //TODO: fix price?
		return data
	} catch (error) {
		console.log('ERROR WHILE ATTEMPTING TO CREATE NEW SELL ORDER:', error) //TODO: set status to error and send email
		return false
	}
}

export const addToQueue = async (invoiceId: string, data: any) => {
	try {
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ 'btcpay.invoiceId': invoiceId }, data)
		return !!databaseResponse
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const saveTradeData = async (invoiceId: string | Array<string>, data: any) => {
	const isSingleInvoice = typeof invoiceId === 'string'
	try {
		isSingleInvoice
			? await InvoiceModel.findOneAndUpdate({ 'btcpay.invoiceId': invoiceId }, data)
			: await InvoiceModel.updateMany({ 'btcpay.invoiceId': { $in: invoiceId } }, data)
		return true
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const getBitcoinPrice = async () => {
	try {
		const { data } = await BinanceService.getPrice()
		return data
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return { price: 0 }
	}
}

export const getAllQueuedOrders = async () => {
	try {
		const documents: any = await InvoiceModel.find({ status: invoiceStatus.queuedTrade })
		return documents
	} catch (error) {
		console.log(error) //TODO: set status to error and send email
		return false
	}
}

export const isAmountSufficient = (satoshis: number, rate: number) => {
	const MIN_SATOSHIS = 0.00000050
	const MIN_TRADE_VALUE_USD = 10
	const tradeValueUSD = satoshis * rate
	return satoshis >= MIN_SATOSHIS && tradeValueUSD >= MIN_TRADE_VALUE_USD
}

export const calculateTotalSatsForBulkSell = (bulkSellOrders: Array<any>): number => {
	const totalSats: number = bulkSellOrders.reduce((accumulator: number, order: any) => {
		const orderTotal: number = order.btcpay.totalPaid ?? 0
		if (Number.isNaN(orderTotal)) {
			throw new Error('Invalid input: order total is not a number')
		}
		return accumulator + orderTotal
	}, 0)
	return totalSats
}