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
	//TODO: 1. Determine the amount of BTC to sell (get from orderId/invoiceId)
	try {
		const { data } = await BinanceService.createTrade('0.1')
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