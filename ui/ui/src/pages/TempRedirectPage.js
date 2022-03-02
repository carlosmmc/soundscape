import '../styling/error.css'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { init_spotify_conn, set_users_name } from '../utils/spotify_conn.mjs'

const TempRedirectPage = ({ setSpotifyToken, setUsersName }) => {
    const navigate = useNavigate()

    useEffect(() => {
        init_spotify_conn(setSpotifyToken, setUsersName)
        navigate("/")
    }, [])

    return (<></>)
}

export default TempRedirectPage;