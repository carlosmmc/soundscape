import '../styling/home.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import populate_artist_view from '../utils/microservice_highway.mjs';

const Home = ({ setArtistInfo }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    return (
        <div className="HomePage">
            <h1 className="HomeTitle">soundscape</h1>
            <form>
                <input className="HomeInput" type="text" placeholder="Artist Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <br></br>
                <button className="HomeButton"
                    onClick={e => {
                        setSearchTerm(e.target.value)
                        populate_artist_view(navigate, setArtistInfo, searchTerm)
                        e.preventDefault()
                    }}>
                    Search </button>
            </form>
        </div>
    );
}

export default Home;