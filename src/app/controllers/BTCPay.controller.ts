import StatusCode from '../../configurations/StatusCode'
import BTCPayService from '../../shared/api/services/BTCPayService'

const getInvoices = async (request, response) => {
	const { storeID } = request.body
	try {
		const { data } = await BTCPayService.getInvoices(storeID)
		console.log(data)
		return response.status(StatusCode.OK).send(data)
	} catch (error) {
		console.log(error.message)
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	getInvoices
}