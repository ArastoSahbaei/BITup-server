import { Application } from 'express'
import AuthenticationRoute from './Authentication.route'
import BTCPayRoute from './BTCPay.route'
import UserRoute from './User.route'

export const RouteHandler = (application: Application) => {
	AuthenticationRoute.routes(application)
	BTCPayRoute.routes(application)
	UserRoute.routes(application)
}