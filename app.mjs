'use strict';

// import modules
import express from 'express'

// set intiial variables
const PORT = 3000;
const app = express()

app.get('/', (req, res) => {
    res.send('houston we have many problems, but at least we are able to comunicate')
})

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})