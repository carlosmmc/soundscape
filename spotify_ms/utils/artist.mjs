'use strict'

/**
 * main spotify logic which gathers information about a given artist. it will return
 * an object with the following: artist information, style composition, top track ids and
 * related artists
 */
const main = async (req, res, next) => {
    const { spotify_conn } = req
    spotify_conn.setAccessToken(req.body.token)
    const artist_results = await artist_search(spotify_conn, req.body.artist)

    const [top_track_ids, related_artists] = await Promise.all([
        query_top_tracks(spotify_conn, artist_results.id),
        query_related_artists(spotify_conn, artist_results.id)])

    const style_analytics = await analyze_tracks(spotify_conn, top_track_ids)
    const compendium = compile_results(artist_results, style_analytics, top_track_ids, related_artists)

    res.send(JSON.stringify(compendium))
}

/**
 * searches for a given artist using the spotify api. upon success it returns the
 * following: artist id, genre, name, popularity, images and followers.
 */
const artist_search = async (spotify_conn, search_term) => {
    const response = await spotify_conn.searchArtists(search_term, { limit: 1 })
    const { id, genres, name, popularity, images, followers: { total: followers } } = response.body.artists.items[0]
    return { id, genres, name, popularity, images, followers }
}

/**
 * searches for the top tracks of an artist. upon success it returns an array of
 * track ids.
*/
const query_top_tracks = async (spotify_conn, artist_id, market = 'US') => {
    const response = await spotify_conn.getArtistTopTracks(artist_id, market)
    const top_track_ids = response.body.tracks.map(info => info.id)
    return top_track_ids
}

/**
 * analyzes an input of track ids and gets the average of the following musical
 * metrics: danceability, energy, speechiness, instrumentalness, acousticness, liveness,
 * valence
*/
const analyze_tracks = async (spotify_conn, track_ids) => {
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
 * searches for related artists. upon success it returns an array of artist ids
*/
const query_related_artists = async (spotify_conn, artist_id) => {
    const response = await spotify_conn.getArtistRelatedArtists(artist_id)
    const related_artists = []

    for (const sibling of response.body.artists) {
        if (related_artists.length == 5) { break }
        const { id, name, images } = sibling
        related_artists.push({ id, name, images })
    }

    return related_artists
}

/**
 * compiles results into an object
*/
const compile_results = (artist_results, style_analytics, top_track_ids, related_artists) => {
    const compendium = Object.assign({}, artist_results)
    compendium['style_analytics'] = style_analytics
    compendium['top_track_ids'] = top_track_ids
    compendium['related_artists'] = related_artists
    return compendium
}

export { main as artist_compendium }