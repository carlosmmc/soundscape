import querystring from 'querystring'
import { Buffer } from 'buffer'

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

const set_spotify_token = async (setSpotifyToken) => {
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
}

export { spotify_login, set_spotify_token }