import React from 'react'
import { Link } from 'react-router-dom'
import save_graph from '../utils/graph_saver'

const ArtistView = ({ artistInfo }) => {
    return (
        <div>
            <Link to="/">Home Page</Link>
            <h1>{artistInfo.name}</h1>
            <img src={artistInfo.images[1].url} />
            <p>genres: {artistInfo.genres.join(", ")}</p>
            <p>spotify popularity: {artistInfo.popularity}%</p>
            <p>% your style matches with this artist: {Math.round(artistInfo.similarity_metric * 100)}%</p>
            <p>followers: {artistInfo.followers.toLocaleString()}</p>
            <p>related artists: {artistInfo.related_artists.map(artist => artist.name).join(", ")}</p>
            <img src={artistInfo.graph_url} />
            <br />
            <button onClick={e => {
                save_graph(artistInfo.graph_url, artistInfo.name)
                e.preventDefault()
            }}> Download </button>
            <br />
        </div>
    );
}

export default ArtistView;