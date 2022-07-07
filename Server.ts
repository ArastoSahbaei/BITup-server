import express from 'express'
import morgan from 'morgan'

const application = express()
application.use(express.json())
application.use(morgan('common'))