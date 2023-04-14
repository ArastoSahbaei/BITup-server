import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'
import { invoiceStatus } from '../../shared/enums'
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
	calculcateSellingPrice,
	calculateTotalSatsForBulksell,
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

	const totalRoundedSats: number = getRoundedDecimals(invoicePaymentData.data[0].amount)
	await updateInvoiceStatus(invoiceId, invoiceStatus.determinatingTradeType)
	const { price } = await getBitcoinPrice()
	const isEligableForInstantSell = isAmountSufficient(totalRoundedSats, price)

	if (isEligableForInstantSell) {
		/* const sellingPrice = calculcateSellingPrice(roundedDecimals, 150) */ //TODO: make this dynamic
		const createdSellOrder = await createNewSellOrder(totalRoundedSats)
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
				amount_BTC: totalRoundedSats.toString(),
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
			amount_BTC: totalRoundedSats.toString(),
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
	const orders: Array<any> = await getAllQueuedOrders()
	console.log(orders.length)
	if (!orders.length) { return }

	const summedSatoshis: number = calculateTotalSatsForBulksell(orders)
	console.log('totalSats in bulk order:', summedSatoshis)
	const { price } = await getBitcoinPrice()

	const totalRoundedSats: number = getRoundedDecimals(summedSatoshis)
	const isEligableForInstantSell: boolean = isAmountSufficient(totalRoundedSats, price)
	const invoiceIds = orders.map(order => order.btcpay.invoiceId).reduce((accumulator, current) => {
		accumulator.push(current)
		return accumulator
	}, [])
	const invoiceIds2 = orders.map(order => order.btcpay.invoiceId)

	console.log('invoiceIds', invoiceIds)
	console.log('invoiceIds2', invoiceIds2)

	if (Array.isArray(invoiceIds)) {
		console.log('invoiceIds is an array')
	} else {
		console.log('invoiceIds is not an array')
	}
	if (Array.isArray(invoiceIds2)) {
		console.log('invoiceIds2 is an array')
	} else {
		console.log('invoiceIds2 is not an array')
	}

	if (!isEligableForInstantSell) { return }
	const createdSellOrder = await createNewSellOrder(totalRoundedSats)
	if (!createdSellOrder) { return }




	//TODO: calculate the orders so that the total amount is sold for profit

	await saveTradeData(invoiceIds, {
		status: invoiceStatus.completedTrade,
		exchange: {
			name: 'binance',
			amount_BTC: totalRoundedSats.toString(),
			orderId: createdSellOrder.orderId,
			clientOrderId: createdSellOrder.clientOrderId,
			price_USD: createdSellOrder.fills[0]?.price,
		}
	})
}

export default {
	testConnectivity,
	getAccountInformation,
	createTrade,
}