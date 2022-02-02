import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = ({ setArtistInfo }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const test_func = async (navigate, setArtistInfo, searchTerm) => {
        const path = `http://localhost:4000/artist/${searchTerm}`
        const response = await fetch(path, { method: 'GET' })
        const data = await response.json()
        setArtistInfo(data)
        navigate('/artist')
    }

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
                        test_func(navigate, setArtistInfo, searchTerm)
                        e.preventDefault()
                    }}>
                    Submit </button>
            </form>
        </div>
    );
}

export default Home;