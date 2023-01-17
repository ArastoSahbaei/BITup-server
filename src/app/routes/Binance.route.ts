import { Application } from 'express'
import { authenticateWebHook } from '../../middlewares/authenticateWebHook'
import BinanceController from '../controllers/Binance.controller'

const routes = (application: Application) => {
	application.get('/binance-test', BinanceController.testConnectivity)
	application.get('/account', BinanceController.getAccountInformation)
	application.post('/sell-order/store/:storeID/invoice/:invoiceID', BinanceController.createTrade)
	application.post('/testhaha', authenticateWebHook, BinanceController.test)
}

export default { routes }