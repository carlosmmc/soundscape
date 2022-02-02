import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import ArtistView from './pages/ArtistView'
import { useState } from 'react'

// import fetch from "node-fetch"

// const test_func = async () => {
//   alert('hi')
//   const path = 'http://localhost:3000/artist/skizzy mars'
//   const response = await fetch(path, { method: 'GET' })
//   const data = await response.json()
//   return data
// }

function App() {
  const [artistInfo, setArtistInfo] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setArtistInfo={setArtistInfo} />} />
            <Route path="/artist" element={<ArtistView artistInfo={artistInfo} />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
