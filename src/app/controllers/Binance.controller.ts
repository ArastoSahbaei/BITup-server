import BTCPayService from '../../shared/api/services/BTCPayService'
import StatusCode from '../../configurations/StatusCode'
import BinanceService from '../../shared/api/services/BinanceService'

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
		console.log('FUCKING ERROR')
		console.log(error)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const createTrade = async (request, response) => {
	//TODO: 1. get invoiceID to determine how which amount of coins to sell (call btcpay api - getInvoice)
	console.log('request.params.storeID', request.params.storeID)
	console.log('request.params.invoiceID', request.params.invoiceID)



	try {
		const invoiceResponse = await BTCPayService.getInvoice(request.params.storeID, request.params.invoiceID)
		console.log(invoiceResponse.data.amount)
		console.log(invoiceResponse.data.amount)
		console.log(invoiceResponse.data.amount)
		console.log(invoiceResponse.data.amount)
		const { data } = await BinanceService.createTrade(invoiceResponse.data.amount.toString())
		console.log(data)
		response.status(StatusCode.OK).send({ message: data })
	} catch (error) {
		console.log('FUCKING ERROR')
		console.log(error)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	testConnectivity,
	getAccountInformation,
	createTrade,
}