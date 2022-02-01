import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <form>

          <fieldset>
            <legend>soundscape artist search</legend>
            <label>artist name
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </label>
          </fieldset>
          <button
            onClick={e => {
              setSearchTerm(e.target.value)
              alert(`you searched for "${searchTerm}"`)
              e.preventDefault()
            }}>
            Submit </button>
        </form>
      </header>
    </div>
  );
}

export default App;
