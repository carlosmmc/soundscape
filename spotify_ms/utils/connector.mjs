'use strict'

import { get_user_info } from './user_flow.mjs'
import { get_artist_info } from './artist_flow.mjs'
import { calc_similarity } from './utils.mjs'

/**
 * main spotify connection logic which gets information about a given artist and user. it will return
 * an object with the following: artist information, style composition, top track ids, 
 * related artists & user analytics.
 */
const compendium_creation = async (req, res, next) => {
    const { spotify_conn } = req
    spotify_conn.setAccessToken(req.body.token)

    const [user_analytics, compendium] = await Promise.all([
        get_user_info(spotify_conn),
        get_artist_info(spotify_conn, req.body.artist)
    ])

    compendium['user_analytics'] = user_analytics
    compendium['similarity_metric'] = calc_similarity(compendium['artist_analytics'], compendium['user_analytics'])
    res.send(JSON.stringify(compendium))
}

/**
 * gets a logged in users first name
 */
const user_info = async (req, res, next) => {
    const { spotify_conn } = req
    spotify_conn.setAccessToken(req.body.token)
    const response = await spotify_conn.getMe()
    const first_name = response.body.display_name.split(" ")[0]
    res.send(JSON.stringify({ first_name }))
}

export { compendium_creation, user_info }