'use strict'

// import modules
import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import 'dotenv/config'
import { compendium_creation, user_info } from './utils/connector.mjs'
import { error_catcher, error_handler } from './utils/errorHelper.mjs'
import allow_cross_domain from './utils/CORS.mjs'

// set intiial variables
const PORT = process.env.PORT
const app = express()

// initialize spotify api
var spotifyApi = new SpotifyWebApi({ redirectUri: 'http://localhost:3000/' })

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
app.post('/compendium', error_catcher(compendium_creation))
app.post('/user', error_catcher(user_info))

// error handling
app.use(error_handler)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})