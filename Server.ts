import express from 'express'
import { errorHandler, notFound } from './src/middlewares'
import { connectToDatabase, connectToPort, useCors, useHelmet, useMorgan } from './src/functions'
import { RouteHandler } from './src/app/routes/RouteHandler'

const application = express()
application.use(express.json())
useCors(application)
useHelmet(application)
useMorgan(application)
RouteHandler(application)

function myFunction() {
	// code to be executed every minute
	console.log('This function is executed every minute.')
}

// Call the function every minute
//setInterval(myFunction, 60 * 1000)

application.use(notFound)
application.use(errorHandler)

connectToDatabase()
connectToPort(application)