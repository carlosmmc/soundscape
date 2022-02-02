'use strict'

// import modules
import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import 'dotenv/config'
import { artist_compendium } from './compendium_creation/artist.mjs'
import { errorCatcher, errorHandler } from './utils/errorHelper.mjs'

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
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// endpoints
app.get('/artist/:name', errorCatcher(artist_compendium))

// error handling
app.use(errorHandler)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})