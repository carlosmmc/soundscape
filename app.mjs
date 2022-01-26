'use strict';

// import modules
import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import 'dotenv/config'
import { artist_compendium } from './compendium_creation/artist.mjs';

// set intiial variables
const PORT = 3000;
const app = express()

// initialize spotify api
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/'
})

spotifyApi.setAccessToken(process.env.SPOTIFY_TOKEN)

app.use('/', (req, res, next) => {
    req.spotify_conn = spotifyApi
    next()
}
)

// endpoints
app.get('/artist/:name', artist_compendium)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})