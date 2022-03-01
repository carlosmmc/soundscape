import '../styling/error.css'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { set_spotify_token } from '../utils/spotify_conn.mjs'

const TempRedirectPage = ({ setSpotifyToken }) => {
    const navigate = useNavigate()

    useEffect(() => {
        set_spotify_token(setSpotifyToken)
        navigate("/")
    }, [])

    return (<></>)
}

export default TempRedirectPage;