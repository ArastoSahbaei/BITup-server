import express from 'express'
import { errorHandler, notFound } from './src/middlewares'
import { connectToDatabase, connectToPort, useCors, useHelmet, useMorgan } from './src/functions'
import { RouteHandler } from './src/app/routes/RouteHandler'

export const application = express()
/* application.use(express.json({
  verify: (request: any, response, buffer) => {
    request.rawBody = buffer
  }
})) */
useCors(application)
useHelmet(application)
useMorgan(application)
RouteHandler(application)
application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)