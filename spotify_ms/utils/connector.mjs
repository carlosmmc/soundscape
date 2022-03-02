'use strict'

import { get_user_info } from './user_flow.mjs'
import { get_artist_info } from './artist_flow.mjs'

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
    res.send(JSON.stringify(compendium))
}

export { compendium_creation }