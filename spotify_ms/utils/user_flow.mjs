'use strict'

import { analyze_track_ids } from "./utils.mjs"

/**
 * main user flow, right now it is just getting their top tracks and analyzing them.
*/
const get_user_info = async (spotify_conn) => {
    const user_info_response = await spotify_conn.getMyTopTracks()
    const user_top_track_ids = user_info_response.body.items.map(info => info.id)
    const user_analytics = await analyze_track_ids(spotify_conn, user_top_track_ids)
    return user_analytics
}

export { get_user_info }