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
		//TODO: Why does invoiceResponse return an array? Shouldn't it return a single object? in what scenarios does it return multiple objects?
		//TODO: Solve this by get the data from local backend instead of BTCPayServer. Find by invoiceID and then update the status field
		const databaseResponse = await InvoiceModel.findOneAndUpdate({ BTCPAY_invoiceId: invoiceID }, { status: invoiceStatus.settled })
		if (databaseResponse.status === invoiceStatus.settled) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice already settled' })
		}
		const invoiceResponse = await BTCPayService.getInvoicePaymentMethods(storeID, invoiceID)
		console.log(invoiceResponse.data[0].totalPaid)
		//TODO: Too many decimels. write function to handle this?
		//TODO: minimum order must be >10$USD - How to handle this?
		const { data } = await BinanceService.createTrade('0.0007')
		/* console.log(data) */
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