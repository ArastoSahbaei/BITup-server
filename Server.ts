import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import AuthenticationRoute from './src/app/routes/Authentication.route'
import UserRoute from './src/app/routes/User.route'
import { connectToDatabase, connectToPort } from './src/functions'
import { errorHandler, notFound } from './src/middlewares'

const application = express()
application.use(cors({ credentials: true }))
application.use(express.json())
application.use(morgan('common'))

AuthenticationRoute.routes(application)
UserRoute.routes(application)

application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)