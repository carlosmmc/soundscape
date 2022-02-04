'use strict'

// import modules
import express from 'express'
import 'dotenv/config'
import { chart_maker } from './utils/graphs.mjs'
import { errorCatcher, errorHandler } from './utils/errorHelper.mjs'
import allowCrossDomain from './utils/CORS.mjs'

// set intiial variables
const PORT = process.env.PORT
const app = express()


// middleware for CORS policy
app.use(allowCrossDomain);

// middleware
app.use(express.json())

// endpoints
app.post('/generateGraph', errorCatcher(chart_maker))

// error handling
app.use(errorHandler)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})