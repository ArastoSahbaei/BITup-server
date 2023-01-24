import StatusCode from '../../configurations/StatusCode'
import BTCPayService from '../../shared/api/services/BTCPayService'
import { invoiceStatus } from '../../shared/enums'

export const verifyInvoice = async (storeId: string, invoiceId: string, response: any) => {
	console.log('verifyInvoice: ', storeId, invoiceId)
	return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not settled' })


}