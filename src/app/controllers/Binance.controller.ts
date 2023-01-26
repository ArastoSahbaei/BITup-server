import BTCPayService from '../../shared/api/services/BTCPayService'
import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'
import InvoiceModel from '../models/Invoice.model'
import { invoiceStatus } from '../../shared/enums'
import { checkTransactionHistory, validateInvoice } from '../services/Binance.services'

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

	const isInvoiceValid = validateInvoice(storeId, invoiceId)
	if (!isInvoiceValid) {
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not found' })
	}

	const hasPreviousSellOrder = checkTransactionHistory(invoiceId)
	if (hasPreviousSellOrder) {
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice already settled' })
	}

	try {
		//2. Save the invoice data to the database.

		//3.5 Verify that the quanntity is high enough to create a trade order

		//4. Create a trade

		//TODO: Why does invoiceResponse return an array? Shouldn't it return a single object? in what scenarios does it return multiple objects?
		const invoiceResponse = await BTCPayService.getInvoicePaymentMethods(storeId, invoiceId)
		const roundedDecimals = Math.round(invoiceResponse.data[0].amount * 1000) / 1000
		const { data } = await BinanceService.createTrade(roundedDecimals.toString())
		await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceId }, {
			exchangeRate: invoiceResponse.data[0].rate,
			totalPaid: invoiceResponse.data[0].totalPaid,
			amount_BTC: invoiceResponse.data[0].amount,
			tradeData: {
				amount_BTC: roundedDecimals.toString(),
				orderId: data.orderId,
				clientOrderId: data.clientOrderId,
				price_USD: data.fills[0]?.price,
			}
		})
		response.status(StatusCode.OK).send({ message: data })
	} catch (error) {
		console.log(error)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
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