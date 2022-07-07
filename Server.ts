import express from 'express'
import morgan from 'morgan'
import UserRoute from './src/app/routes/User.route'
import { connectToDatabase, connectToPort } from './src/functions'
import { errorHandler, notFound } from './src/middlewares'

const application = express()
application.use(express.json())
application.use(morgan('common'))

UserRoute.routes(application)

application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)