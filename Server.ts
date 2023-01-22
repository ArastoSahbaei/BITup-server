import express from 'express'
import { errorHandler, notFound } from './src/middlewares'
import { connectToDatabase, connectToPort, useCors, useHelmet, useMorgan } from './src/functions'
import { RouteHandler } from './src/app/routes/RouteHandler'

const application = express()
application.use(express.json({
	verify: (req: any, res, buf) => {
		console.log(buf.toString('utf8'))
		console.log(buf)
		req.rawBody = buf
	}
}))
useCors(application)
useHelmet(application)
useMorgan(application)
RouteHandler(application)
application.use(notFound)
application.use(errorHandler)


connectToDatabase()
connectToPort(application)