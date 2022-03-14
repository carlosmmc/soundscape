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
    const body = `grant_type=${encodeURIComponent("authorization_code")}&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)}`

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