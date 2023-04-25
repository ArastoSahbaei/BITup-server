import { endpoints } from './endpoints'
import { Application } from 'express'
import { authenticateWebHook } from '../../middlewares'
import BinanceController from '../controllers/Binance.controller'

const {
	testConnectivity,
	getAccountInformation,
	createTrade
} = endpoints.binance

const routes = (application: Application) => {
	application.get(testConnectivity, BinanceController.testConnectivity) //TODO: remove this and everything related + update insomnia?
	application.get(getAccountInformation, BinanceController.getAccountInformation)
	application.post(createTrade, authenticateWebHook, BinanceController.createTrade)
}

export default { routes }