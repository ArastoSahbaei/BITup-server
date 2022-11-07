import { Application } from 'express'
import AuthenticationRoute from './Authentication.route'
import BTCPayRoute from './BTCPay.route'
import UserRoute from './User.route'
import BinanceRoute from './Binance.route'

export const RouteHandler = (application: Application) => {
	AuthenticationRoute.routes(application)
	BinanceRoute.routes(application)
	BTCPayRoute.routes(application)
	UserRoute.routes(application)
}