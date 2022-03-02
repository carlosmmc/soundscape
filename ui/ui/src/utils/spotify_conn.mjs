import querystring from 'querystring'
import { Buffer } from 'buffer'


/**
 * redirects to spotify auth page
 */
const spotify_login = () => {
    const redirect_url = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            scope: process.env.REACT_APP_SCOPE,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        })

    window.location = redirect_url
}

/**
 * sets the spotify token and the logged in users name
 */
const init_spotify_conn = async (setSpotifyToken, setUsersName) => {
    const code = window.location.search.substring(1).split('code=')[1]
    const url = 'https://accounts.spotify.com/api/token'
    const bodyToEncode = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    }

    // https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
    const body = Object.entries(bodyToEncode).map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v)).join('&')
    const headers = {
        'Authorization': 'Basic ' +
            (new Buffer(process.env.REACT_APP_SPOTIFY_CLIENT_ID +
                ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body
    })

    const data = await response.json()
    const token = data['access_token']
    setSpotifyToken(token)
    set_users_name(token, setUsersName)
}

/**
 * sets a logged in users name 
 */
const set_users_name = async (token, setUsersName) => {
    const path = 'http://localhost:4000/user'
    const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify({ 'token': token }),
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()
    setUsersName(data['first_name'])
}

export { spotify_login, init_spotify_conn }