import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'
import { invoiceStatus } from '../../shared/enums'
import InvoiceModel from '../models/Invoice.model'
import {
	getInvoicePaymentMethods,
	checkTransactionHistory,
	updateInvoiceStatus,
	createNewSellOrder,
	getRoundedDecimals,
	isAmountSufficient,
	getBitcoinPrice,
	validateInvoice,
	saveTradeData,
	addToQueue,
	getAllQueuedOrders,
} from '../services/Binance.services'

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

	const isInvoiceValid = await validateInvoice(storeId, invoiceId)
	if (!isInvoiceValid) {
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not found' })
	}

	const hasPreviousSellOrder = await checkTransactionHistory(invoiceId)
	if (hasPreviousSellOrder) {
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice has already been settled' })
	}

	const invoicePaymentData = await getInvoicePaymentMethods(storeId, invoiceId)
	if (!invoicePaymentData) {
		return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice payment data not found' })
	}

	const roundedDecimals: number = getRoundedDecimals(invoicePaymentData.data[0].amount)
	await updateInvoiceStatus(invoiceId, invoiceStatus.determinatingTradeType)
	const { price } = await getBitcoinPrice()
	const isEligableForInstantSell = isAmountSufficient(roundedDecimals, price)

	if (isEligableForInstantSell) {
		const createdSellOrder = await createNewSellOrder(roundedDecimals)
		if (!createdSellOrder) {
			response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Could not create sell order' })
		}
		const savedTradeData = await saveTradeData(invoiceId, {
			status: invoiceStatus.completedTrade,
			'btcpay.amount_BTC': invoicePaymentData.data[0].amount,
			'btcpay.exchangeRate': invoicePaymentData.data[0].rate,
			'btcpay.totalPaid': invoicePaymentData.data[0].totalPaid,
			exchange: {
				name: 'binance',
				amount_BTC: roundedDecimals.toString(),
				orderId: createdSellOrder.orderId,
				clientOrderId: createdSellOrder.clientOrderId,
				price_USD: createdSellOrder.fills[0]?.price,
			}
		})
		if (!savedTradeData) {
			response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Could not save trade data' })
		}
		return response.status(StatusCode.OK).send({ message: savedTradeData })
	}

	const addedToQueue = await addToQueue(invoiceId, {
		status: invoiceStatus.queuedTrade,
		'btcpay.amount_BTC': invoicePaymentData.data[0].amount,
		'btcpay.exchangeRate': invoicePaymentData.data[0].rate,
		'btcpay.totalPaid': invoicePaymentData.data[0].totalPaid,
		exchange: {
			name: null,
			amount_BTC: roundedDecimals.toString(),
			orderId: null,
			clientOrderId: null,
			price_USD: null,
		}
	})

	if (!addedToQueue) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Could not add to queue' })
	}
	response.status(StatusCode.OK).send({ message: addedToQueue })
}



export const createBulkTrade = async () => {
	const orders = await getAllQueuedOrders()
	const totalSatoshis = orders.reduce((totalSatoshis, order) => totalSatoshis + order.btcpay.totalPaid)
	console.log(orders)
	console.log(orders.length)
	console.log(totalSatoshis)

	// code to be executed every minute
	//get the queue list from the database
	//calculate the list
	//create the sell order
	console.log('This function is executed every minute.')
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