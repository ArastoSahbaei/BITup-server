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
	amount: {
		type: Number,
	},
	checkoutLink: {
		type: String,
	}
}, { timestamps: true })

const InvoiceModel = mongoose.model('invoice', invoiceSchema)
export default InvoiceModel
