import BTCPayService from '../../shared/api/services/BTCPayService'
import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'
import InvoiceModel from '../models/Invoice.model'
import { invoiceStatus } from '../../shared/enums'

const testConnectivity = async (request, response) => {
	try {
		const { data } = await BinanceService.test()
		console.log(data)
		response.status(StatusCode.OK).send({ message: data })
	} catch (error) {
		console.log('FUCKING ERROR')
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
	const { storeID, invoiceID } = request.params
	try {
		//TODO: get invoice from BTCPay
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceID }, { status: invoiceStatus.settled })
		if (databaseResponse.status === invoiceStatus.settled) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice already settled' })
		}

		//TODO: Why does invoiceResponse return an array? Shouldn't it return a single object? in what scenarios does it return multiple objects?
		const invoiceResponse = await BTCPayService.getInvoicePaymentMethods(storeID, invoiceID)
		const roundedDecimals = Math.round(invoiceResponse.data[0].amount * 1000) / 1000
		const { data } = await BinanceService.createTrade(roundedDecimals.toString())
		await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceID }, {
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

export default {
	testConnectivity,
	getAccountInformation,
	createTrade,
}