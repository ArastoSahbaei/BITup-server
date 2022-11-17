import { Application } from 'express'
import BinanceController from '../controllers/Binance.controller'

const routes = (application: Application) => {
	application.get('/binance-test', BinanceController.testConnectivity)
	application.get('/getAccountInformation', BinanceController.getAccountInformation)
}

export default { routes }