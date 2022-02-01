'use strict'

// import modules
import express from 'express'
import 'dotenv/config'
import fetch from "node-fetch"

// set intiial variables
const PORT = 8000
const app = express()

// endpoints
app.get('/', async (req, res) => {
    const path = 'http://localhost:3000/artist/skizzy mars'
    const response = await fetch(path, { method: 'GET' })
    const data = await response.json()
    res.send(data)
})

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})