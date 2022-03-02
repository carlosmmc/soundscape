'use strict'

/**
 * analyzes an input of track ids and gets the average of the following musical
 * metrics: danceability, energy, speechiness, instrumentalness, acousticness, liveness,
 * valence
*/
const analyze_track_ids = async (spotify_conn, track_ids) => {
    const response = await spotify_conn.getAudioFeaturesForTracks(track_ids)
    const num_tracks = Object.keys(response.body.audio_features).length

    const style_analytics = {
        'danceability': 0, 'energy': 0, 'speechiness': 0, 'instrumentalness': 0,
        'acousticness': 0, 'liveness': 0, 'valence': 0,
    }

    for (const track of response.body.audio_features) {
        for (const feature of Object.keys(style_analytics)) {
            style_analytics[feature] += track[feature]
        }
    }

    for (const feature of Object.keys(style_analytics)) {
        style_analytics[feature] /= num_tracks
    }

    return style_analytics
}

/**
 * compiles results into an object
*/
const compile_results = (artist_results, artist_analytics, top_track_ids, related_artists) => {
    const compendium = Object.assign({}, artist_results)
    compendium['artist_analytics'] = artist_analytics
    compendium['top_track_ids'] = top_track_ids
    compendium['related_artists'] = related_artists
    return compendium
}

export { analyze_track_ids, compile_results }