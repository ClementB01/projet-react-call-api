import React from 'react';
import './App.css';

type Character = {
  results: Array<{
    id: number
    name: string
    image: string
  }>
}

const getCharacters = () =>
  fetch(`https://rickandmortyapi.com/api/character/`, {
    headers: { Accept: 'application/json' },
  }).then<Character>(res => res.json())

const App: React.FC = () => {
  const [characters, setCharacters] = React.useState<Character| null>(null)
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    let cancel = false
    setLoading(true)

    getCharacters(/*page*/).then(data => {
      if (!cancel) {
        setCharacters(data)
        setLoading(false)
      }
    })

    return () => {
      cancel = true
    }
  }, [/*page*/])

  return (
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ) : (
          characters && characters.results.map(character => <p key={character.id}><img src={character.image} width="40" height="40" />{character.name}</p>)
        )}
        <button disabled={loading} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={loading} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    )
}

export default App;
