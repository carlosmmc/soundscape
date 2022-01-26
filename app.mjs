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
app.get('/artist/:name', async (req, res) => {
    try {
        // get artist and id - could also get 'followers'.total
        const search_term = req.params.name
        const artist_info = await spotifyApi.searchArtists(search_term, { limit: 1 })
        const {
            id: artist_id,
            genres,
            name: artist_name,
            popularity,
            images: artist_images,
            followers: { total: followers }
        } = artist_info.body.artists.items[0]

        // get top tracks
        const top_tracks = await spotifyApi.getArtistTopTracks(artist_id, 'US')
        const top_track_ids = top_tracks.body.tracks.map(info => info.id)

        // get audio analysis
        const audio_analysis = await spotifyApi.getAudioFeaturesForTracks(top_track_ids)
        const num_tracks = Object.keys(audio_analysis.body.audio_features).length

        const style_analytics = {
            'danceability': 0, 'energy': 0, 'speechiness': 0, 'instrumentalness': 0,
            'acousticness': 0, 'liveness': 0, 'valence': 0,
        }

        for (const track of audio_analysis.body.audio_features) {
            for (const feature of Object.keys(style_analytics)) {
                style_analytics[feature] += track[feature]
            }
        }

        for (const feature of Object.keys(style_analytics)) {
            style_analytics[feature] /= num_tracks
        }

        const related_artists_full = await spotifyApi.getArtistRelatedArtists(artist_id)
        const related_artists = []

        for (const sibling of related_artists_full.body.artists) {
            const { id, name, images } = sibling
            related_artists.push({ id, name, images })
        }

        const compendium = {
            'id': artist_id, genres, 'name': artist_name, popularity, 'images': artist_images,
            followers, top_track_ids, style_analytics, related_artists
        }

        res.send(JSON.stringify(compendium))

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