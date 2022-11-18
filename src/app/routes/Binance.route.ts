import { Application } from 'express'
import BinanceController from '../controllers/Binance.controller'

const routes = (application: Application) => {
	application.get('/binance-test', BinanceController.testConnectivity)
	application.get('/account', BinanceController.getAccountInformation)
	application.post('/trade', BinanceController.createTrade)
}

export default { routes }