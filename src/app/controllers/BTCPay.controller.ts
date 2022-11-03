import StatusCode from '../../configurations/StatusCode'
import BTCPayService from '../../shared/api/services/BTCPayService'

const getInvoices = async (request, response) => {
	const { storeID } = request.body
	try {
		const { data } = await BTCPayService.getInvoices(storeID)
		return response.status(StatusCode.OK).send(data)
	} catch (error) {
		console.log(error.message)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const createInvoice = async (request, response) => {
	const { storeID, amount } = request.body
	try {
		const { data } = await BTCPayService.createInvoice(storeID, amount)
		console.log(data)
		return response.status(StatusCode.CREATED).send(data)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	getInvoices,
	createInvoice
}