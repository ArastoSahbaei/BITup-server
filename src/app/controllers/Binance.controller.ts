import BTCPayService from '../../shared/api/services/BTCPayService'
import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'
import InvoiceModel from '../models/Invoice.model'
import { invoiceStatus } from '../../shared/enums'
import crypto from 'crypto'

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
	const { storeID, invoiceID } = request.params
	try {
		//1. Verify that the invoice is legitimate. Only settled invoices can be used to create a trade. (To ensure that only truly settled invoices are used to create a trade)
		const invoice = await BTCPayService.getInvoice(storeID, invoiceID)
		const isInvoiceLegitimate: boolean = invoice.data.status === invoiceStatus.settled || invoice.data.status === invoiceStatus.inProcess
		if (!isInvoiceLegitimate) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not settled' })
		}
		//2. Save the invoice data to the database
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceID }, { status: invoiceStatus.settled })

		//3. Verify that the invoice has not already been used to create a trade (To ensure that the invoice is not used twice)
		/* if (databaseResponse.status === invoiceStatus.settled) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice already settled' })
		} */

		//3.5 Verify that the quanntity is high enough to create a trade order
		//4. Create a trade
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

const test = (request, response) => {
	try {
		const payload = request.body // The webhook payload
		console.log('this is the payload', payload)
		const secret = 'yoursecretkey' // The secret key provided by BTCPay Server
		const btcpaySig = request.headers['btcpay-sig'] // The BTCPAY-SIG header
		console.log('this is the btcpaySig', btcpaySig)
		const payloadBytes = JSON.stringify(payload) // Stringify payload to bytes
		console.log('this is the payloadBytes', payloadBytes)
		const calculatedSig = crypto.createHmac('sha256', secret).update(payloadBytes).digest('hex')
		if (calculatedSig !== btcpaySig) {
			// The signature does not match, the payload may have been tampered with or sent by an unauthorized source
			return response.status(401).send('Unauthorized')
		}
		// The signature matches, the payload is valid
		// Your code to handle the webhook payload goes here
		// ...
		response.send('Webhook received!')
	} catch (error) {
		console.log(error)
	}
}

export default {
	testConnectivity,
	test,
	getAccountInformation,
	createTrade,
}