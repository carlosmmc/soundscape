'use strict'

// import modules
import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import 'dotenv/config'
import { artist_compendium } from './utils/artist.mjs'
import { error_catcher, error_handler } from './utils/errorHelper.mjs'
import allow_cross_domain from './utils/CORS.mjs'

// set intiial variables
const PORT = process.env.PORT
const app = express()

// initialize spotify api
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/'
})
spotifyApi.setAccessToken(process.env.SPOTIFY_TOKEN)

// middleware to assign the spotify connection to request
app.use('/', (req, res, next) => {
    req.spotify_conn = spotifyApi
    next()
})

// middleware for CORS policy
app.use(allow_cross_domain);

// middleware for parsing JSON
app.use(express.json())

// endpoints
app.post('/artist', error_catcher(artist_compendium))

// error handling
app.use(error_handler)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})