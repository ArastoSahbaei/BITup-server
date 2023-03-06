import { Application } from 'express'
import { authenticateWebHook } from '../../middlewares'
import BinanceController from '../controllers/Binance.controller'

const routes = (application: Application) => {
	application.get('/binance-test', BinanceController.testConnectivity)
	application.get('/account', BinanceController.getAccountInformation)
	application.post('/sell-order', authenticateWebHook, BinanceController.createTrade)
}

export default { routes }