import React from 'react';
import { Link } from 'react-router-dom';

const ArtistView = ({ artistInfo }) => {
    return (
        <div>
            <h1>{artistInfo.name}</h1>
            <h6>{artistInfo.genres}</h6>
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default ArtistView;