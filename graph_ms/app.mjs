'use strict'

// import modules
import express from 'express'
import 'dotenv/config'
import { chart_maker } from './utils/graphs.mjs'
import { error_catcher, error_handler } from './utils/errorHelper.mjs'
import allow_cross_comain from './utils/CORS.mjs'

// set intiial variables
const PORT = process.env.PORT
const app = express()

// middleware for CORS policy
app.use(allow_cross_comain);

// middleware
app.use(express.json())

// endpoints
app.post('/generateGraph', error_catcher(chart_maker))

// error handling
app.use(error_handler)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})