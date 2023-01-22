import express from 'express'
import { errorHandler, notFound } from './src/middlewares'
import { connectToDatabase, connectToPort, useCors, useHelmet, useMorgan } from './src/functions'
import { RouteHandler } from './src/app/routes/RouteHandler'
import bodyParser from 'body-parser'

const application = express()
application.use(express.json())
useCors(application)
useHelmet(application)
useMorgan(application)
RouteHandler(application)
application.use(notFound)
application.use(errorHandler)

application.use(bodyParser.json({
	verify: (req: any, res, buf) => {
		console.log(buf.toString('utf8'))
		console.log(buf)
		req.rawBody = buf
	}
}))

connectToDatabase()
connectToPort(application)