import './styling/App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import ArtistView from './pages/ArtistView'
import ErrorPage from './pages/ErrorPage'
import { useState } from 'react'

function App() {
  const [artistInfo, setArtistInfo] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setArtistInfo={setArtistInfo} />} />
            <Route path="/artist" element={<ArtistView artistInfo={artistInfo} />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/login" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
