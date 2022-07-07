import express from 'express'
import morgan from 'morgan'
import { connectToDatabase, connectToPort } from './src/functions'
import { errorHandler, notFound } from './src/middlewares'

const application = express()
application.use(express.json())
application.use(morgan('common'))

application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)