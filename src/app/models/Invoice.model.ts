import mongoose from 'mongoose'
const { Schema } = mongoose

const invoiceSchema = new Schema({
	status: {
		type: String,
	},
	btcpay: {
		invoiceId: {
			type: String,
			unique: [true, 'invoice id already exists'],
		},
		storeId: {
			type: String,
		},
		currency: {
			type: String,
		},
		amount_fiat: {
			type: Number,
		},
		checkoutLink: {
			type: String,
		},
		receiptLink: {
			type: String,
		},
		exchangeRate: {
			type: String,
			default: null
		},
		totalPaid: {
			type: Number,
			default: null,
		},
		amount_BTC: {
			type: Number,
			default: null
		},
	},
	exchange: {
		name: {
			type: String,
			default: null
		},
		amount_BTC: {
			type: String,
			default: null
		},
		orderId: {
			type: Number,
			default: null
		},
		clientOrderId: {
			type: String,
			default: null
		},
		price_USD: {
			type: String,
			default: null
		}
	}
}, { timestamps: true })

const InvoiceModel = mongoose.model('invoice', invoiceSchema)
export default InvoiceModel
