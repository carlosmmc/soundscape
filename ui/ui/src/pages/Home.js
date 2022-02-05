import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import populate_artist_view from '../utils/microservice_highway.mjs';

const Home = ({ setArtistInfo }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    return (
        <div>
            <h1>~soundscape~</h1>
            <form>
                <fieldset>
                    <p>artist search</p>
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </fieldset>
                <button
                    onClick={e => {
                        setSearchTerm(e.target.value)
                        populate_artist_view(navigate, setArtistInfo, searchTerm)
                        e.preventDefault()
                    }}>
                    Submit </button>
            </form>
            <p>
                enter an artist name above to discover new music you'll love!!
            </p>
            <p>
                the app is fast so you can search for many artists back to back!
            </p>
        </div>
    );
}

export default Home;