'use strict'

// import modules
import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import 'dotenv/config'
import { artist_compendium } from './utils/artist.mjs'
import { errorCatcher, errorHandler } from './utils/errorHelper.mjs'
import allowCrossDomain from './utils/CORS.mjs'

// set intiial variables
const PORT = process.env.PORT
const app = express()

// initialize spotify api
var spotifyApi = new SpotifyWebApi()

// middleware to assign the spotify connection to request
app.use('/', (req, res, next) => {
    req.spotify_conn = spotifyApi
    next()
})

// middleware for CORS policy
app.use(allowCrossDomain);

// middleware for parsing JSON
app.use(express.json())

// endpoints
app.post('/artist', errorCatcher(artist_compendium))

app.post('/testing', (req, res) => {
    console.log(req.body)
    res.send({ 'hi': 'there' })
})

// error handling
app.use(errorHandler)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})