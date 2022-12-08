import mongoose from 'mongoose'
const { Schema } = mongoose

const invoiceSchema = new Schema({
	BTCPAY_invoiceId: {
		type: String,
		unique: [true, 'invoice id already exists'],
	},
	BTCPAY_storeId: {
		type: String,
	},
	status: {
		type: String,
	},
	currency: {
		type: String,
	},
	amount_fiat: {
		type: Number,
	},
	amount_BTC: {
		type: Number,
		default: null
	},
	checkoutLink: {
		type: String,
	},
	receiptLink: {
		type: String,
	},
	totalPaid: {
		type: Number,
		default: null,
	},
	exchangeRate: {
		type: String,
		default: null
	},
	tradeData: {
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
