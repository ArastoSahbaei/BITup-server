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
	console.log('request.body', request.body)
	const { storeId, invoiceId } = request.body
	try {
		//1. Verify that the invoice is legitimate. Only settled invoices can be used to create a trade. (To ensure that only truly settled invoices are used to create a trade)
		const invoice = await BTCPayService.getInvoice(storeId, invoiceId)
		const isInvoiceLegitimate: boolean = invoice.data.status === invoiceStatus.settled || invoice.data.status === invoiceStatus.inProcess
		if (!isInvoiceLegitimate) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not settled' })
		}
		//2. Save the invoice data to the database
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceId }, { status: invoiceStatus.settled })

		//3. Verify that the invoice has not already been used to create a trade (To ensure that the invoice is not used twice)
		/* if (databaseResponse.status === invoiceStatus.settled) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice already settled' })
		} */

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