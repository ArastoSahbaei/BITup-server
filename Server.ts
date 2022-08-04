import cors from 'cors'
import express from 'express'
import BTCPayRoute from './src/app/routes/BTCPay.route'
import AuthenticationRoute from './src/app/routes/Authentication.route'
import UserRoute from './src/app/routes/User.route'
import { errorHandler, notFound } from './src/middlewares'
import { connectToDatabase, connectToPort, useMorgan } from './src/functions'

const application = express()
application.use(cors({ credentials: true }))
application.use(express.json())
useMorgan(application)

AuthenticationRoute.routes(application)
BTCPayRoute.routes(application)
UserRoute.routes(application)

application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)