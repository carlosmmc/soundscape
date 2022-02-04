import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import populate_artist_view from '../utils/microservice_highway.mjs';

const Home = ({ setArtistInfo }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    return (
        <div>
            <h1>soundscape</h1>
            <form>
                <fieldset>
                    <label>artist name
                        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </label>
                </fieldset>
                <button
                    onClick={e => {
                        setSearchTerm(e.target.value)
                        populate_artist_view(navigate, setArtistInfo, searchTerm)
                        e.preventDefault()
                    }}>
                    Submit </button>
            </form>
        </div>
    );
}

export default Home;