import express from 'express'
import { errorHandler, notFound } from './src/middlewares'
import { connectToDatabase, connectToPort, useCors, useHelmet, useMorgan } from './src/functions'
import { RouteHandler } from './src/app/routes/RouteHandler'
import { createBulkTrade } from './src/app/controllers/Binance.controller'

const application = express()
application.use(express.json({
	verify: (request: any, response, buffer) => {
		request.rawBody = buffer
	}
}))
useCors(application)
useHelmet(application)
useMorgan(application)
RouteHandler(application)

/* const createBulkTrade = async () => {

	// code to be executed every minute
	//get the queue list from the database
	//calculate the list
	//create the sell order
	console.log('This function is executed every minute.')
} */

// Call the function every minute
setInterval(createBulkTrade, 60 * 1000)

application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)