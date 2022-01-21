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

// homepage
app.get('/', (req, res) => {
    res.sendFile('tester.html', { root: './public/' })
    // res.send('homepage!!!')
})

// endpoints
app.get('/artist/:name', async (req, res) => {
    try {
        // get artist and id - could also get 'followers'.total
        const search = req.params.name
        const artist_info = await spotifyApi.searchArtists(search, { limit: 1 })
        const { id, genres, name, popularity } = artist_info.body.artists.items[0]

        // get top tracks
        const top_tracks = await spotifyApi.getArtistTopTracks(id, 'US')
        const track_ids = top_tracks.body.tracks.map(info => info.id)

        // get audio analysis
        const audio_analysis = await spotifyApi.getAudioFeaturesForTracks(track_ids)
        const num_tracks = Object.keys(audio_analysis.body.audio_features).length

        const agg_analysis = {
            'danceability': 0, 'energy': 0, 'speechiness': 0,
            'acousticness': 0, 'liveness': 0, 'valence': 0
        }

        for (const track of audio_analysis.body.audio_features) {
            for (const feature of Object.keys(agg_analysis)) {
                agg_analysis[feature] += track[feature]
            }
        }

        for (const feature of Object.keys(agg_analysis)) {
            agg_analysis[feature] /= num_tracks
        }

        const response = `<b>artist</b>: ${search}`
            + `<br/><b>artist_id</b>: ${id}`
            + `<br/><b>genres</b>: ${genres}`
            + `<br/><b>number of tracks analyzed:</b> ${num_tracks}`
            + `<br/><b>track analytics:</b> ${JSON.stringify(agg_analysis)}`

        const yeet = 'hi'

        res.sendFile('tester.html')

    } catch (error) {
        console.log(error)
        res.send('error')
    }
}
)

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})