'use strict';

// import modules
import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import 'dotenv/config'

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

// endpoints
app.get('/', async (req, res) => {
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
        function (data) {
            console.log('Artist albums', data.body);
        },
        function (err) {
            console.error(err);
        }
    );
    res.send('houston we have many problems, but at least we are able to comunicate')
})

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})