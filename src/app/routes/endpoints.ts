//TODO: Add api prefix to all endpoints and update insomnia to match
export const endpoints = {
	authentication: {
		login: '/login',
		createUser: '/register',
		verifyUserEmail: '/emailverification',
		retrieveLostAccount: '/retrieveaccount',
		resetPasswordWithToken: '/resetpassword',
		validateToken: '/validate',
		updatePassword: '/update-password'
	},
	user: {
		getAllUser: '/user',
	},
	binance: {
		testConnectivity: '/binance-test',
		getAccountInformation: '/account',
		createTrade: '/sell-order',
	},
	BTCPay: {
		getInvoices: '/btcpay/invoices',
		createInvoice: '/btcpay/invoices/create',
		getInvoice: '/btcpay/invoices/:storeID/:invoiceID',
		getInvoicePaymentMethods: '/btcpay/store/:storeID/invoices/:invoiceID/payment-methods',
	}
}