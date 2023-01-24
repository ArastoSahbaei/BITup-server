import StatusCode from '../../configurations/StatusCode'
import BTCPayService from '../../shared/api/services/BTCPayService'
import { invoiceStatus } from '../../shared/enums'

export const verifyInvoice = async (storeId: string, invoiceId: string, response: any) => {
	console.log('verifyInvoice: ', storeId, invoiceId, 'response: ', response)
	return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not settled' })

	/* try {
		const invoice = await BTCPayService.getInvoice(storeId, invoiceId)
		const isInvoiceLegitimate: boolean = invoice.data.status === invoiceStatus.settled || invoice.data.status === invoiceStatus.inProcess
		if (!isInvoiceLegitimate) {
			return response.status(StatusCode.METHOD_NOT_ALLOWED).send({ message: 'Invoice not settled' })
		}
	} catch (error) {
		console.log(error)
	} */
}