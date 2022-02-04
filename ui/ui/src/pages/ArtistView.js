import React from 'react';
import { Link } from 'react-router-dom';

const ArtistView = ({ artistInfo }) => {
    return (
        <div>
            <h1>{artistInfo.name}</h1>
            <img src={artistInfo.images[1].url} />
            <p>genres: {artistInfo.genres.join(", ")}</p>
            <p>popularity: {artistInfo.popularity}</p>
            <p>followers: {artistInfo.followers}</p>
            <p>bio: coming soon</p>
            <p>related artists: {artistInfo.related_artists.map(a => a.name).join(", ")}</p>
            <img src={artistInfo.graph_url} />
            <br />
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default ArtistView;