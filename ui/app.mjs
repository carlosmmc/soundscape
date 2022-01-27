'use strict'

// import modules
import express from 'express'
import 'dotenv/config'

// set intiial variables
const PORT = 8000
const app = express()

// endpoints
app.get('/', (req, res) => {
    res.send('hi world')
})

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})