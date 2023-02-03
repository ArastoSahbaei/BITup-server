import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'
import InvoiceModel from '../models/Invoice.model'
import { invoiceStatus } from '../../shared/enums'
import { checkTransactionHistory, createNewSellOrder, getInvoicePaymentMethods, getRoundedDecimals, saveTradeData, updateInvoiceStatus, validateInvoice } from '../services/Binance.services'

const testConnectivity = async (request, response) => {
	try {
		const { data } = await BinanceService.test()
		console.log(data)
		response.status(StatusCode.OK).send({ message: data })
	} catch (error) {
		console.log(error)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAccountInformation = async (request, response) => {
	try {
		const { data } = await BinanceService.getAccountInformation()
		console.log(data)
		response.status(StatusCode.OK).send({ message: data })
	} catch (error) {
		console.log(error)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const createTrade = async (request, response) => {
	const { storeId, invoiceId } = request.body
	console.log('storeId: ', storeId)
	console.log('invoiceId: ', invoiceId)

	const isInvoiceValid = await validateInvoice(storeId, invoiceId)
	if (!isInvoiceValid) {
		console.log('Invoice not found')
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not found' })
	}

	const hasPreviousSellOrder = await checkTransactionHistory(invoiceId)
	if (hasPreviousSellOrder) {
		console.log('Invoice already settled')
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice already settled' })
	}

	updateInvoiceStatus(invoiceId, invoiceStatus.inProcess)

	const invoicePaymentData = await getInvoicePaymentMethods(storeId, invoiceId)
	if (!invoicePaymentData) {
		console.log('Invoice payment data not found')
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice payment data not found' })
	}

	const roundedDecimals: number = getRoundedDecimals(0.00090413) //TODO: Swap to invoicePaymentData.data[0].amount
	//TODO: Create a function that verifies that the quantity is high enough to create a trade order
	const createdSellOrder: any = await createNewSellOrder(roundedDecimals)

	const savedTradeData = await saveTradeData(invoiceId, {
		status: invoiceStatus.completed,
		exchangeRate: invoicePaymentData.data[0].rate,
		totalPaid: invoicePaymentData.data[0].totalPaid,
		amount_BTC: invoicePaymentData.data[0].amount,
		tradeData: {
			amount_BTC: roundedDecimals.toString(),
			orderId: createdSellOrder.orderId,
			clientOrderId: createdSellOrder.clientOrderId,
			price_USD: createdSellOrder.fills[0]?.price,
		}
	})

	if (!savedTradeData) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'could not save trade data' })
	}
	return response.status(StatusCode.OK).send({ message: savedTradeData })
}

const test = (request, response) => {
	console.log('request.body', request.body)
	response.status(201).send('Webhook received!')
}

export default {
	testConnectivity,
	test,
	getAccountInformation,
	createTrade,
}