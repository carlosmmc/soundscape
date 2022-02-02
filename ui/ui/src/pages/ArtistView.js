import React from 'react';
import { Link } from 'react-router-dom';


const ArtistView = ({ artistInfo }) => {
    return (
        <div>
            <h1>{artistInfo}</h1>
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default ArtistView;