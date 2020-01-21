import React from 'react';
import './Character';
import './characterContainer.css';
import './Characters.css';

import {
    Link
  } from "react-router-dom";

type Info = {
  count: number
  pages: number
}

type Characters = {
  info: Info
  results: Array<{
    id: number
    name: string
    image: string
  }>
}

const getCharacters = (page = 1) =>
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`, {
    headers: { Accept: 'application/json' },
  }).then<Characters>(res => res.json())

const App: React.FC = () => {
  const [characters, setCharacters] = React.useState<Characters| null>(null)
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    let cancel = false
    setLoading(true)

    getCharacters(page).then(data => {
      if (!cancel) {
        setCharacters(data)
        setLoading(false)
      }
    })

    return () => {
      cancel = true
    }
  }, [page])

  return (
      <div className="App">
        <div className="divButtonStyle">
          <button disabled={loading} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button disabled={loading} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          characters && characters.results.map(character => <Link to={`/character/${character.id}`} className='linkWithoutTextDecoration'><div key={character.id} className="characterContainer">
            <img className="imgStyle" src={character.image} alt="No image" width="40" height="40" />
            <span className="spanStyle">{character.name}</span></div></Link>
          )
        )}
        <div className="divButtonStyle">
          <button disabled={loading} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button disabled={loading} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    )
}

export default App;