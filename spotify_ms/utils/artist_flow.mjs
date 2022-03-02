'use strict'

import { analyze_track_ids, compile_results } from "./utils.mjs"

/**
 * main user flow, right now it is just getting their top tracks and analyzing them.
*/
const get_artist_info = async (spotify_conn, artist_name) => {
    const artist_results = await artist_search(spotify_conn, artist_name)
    const [top_track_ids, related_artists] = await Promise.all([
        query_top_tracks(spotify_conn, artist_results.id),
        query_related_artists(spotify_conn, artist_results.id)])

    const artist_analytics = await analyze_track_ids(spotify_conn, top_track_ids)
    const artist_compendium = compile_results(artist_results, artist_analytics, top_track_ids, related_artists)

    return artist_compendium
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

export { get_artist_info }