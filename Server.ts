import express from 'express'
import morgan from 'morgan'
import { connectToDatabase, connectToPort } from './src/functions'

const application = express()
application.use(express.json())
application.use(morgan('common'))

connectToDatabase()
connectToPort(application)