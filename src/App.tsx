import React from 'react';
import './App.css';

type Pokemons = {
  count: number,
  next: string,
  previous: null,
  results: Array<{
    name: string
    url: string
  }>
}

const getPokemons = () =>
  fetch(`https://pokeapi.co/api/v2/pokemon`, {
    headers: { Accept: 'application/json' },
  }).then<Pokemons>(res => res.json())

const App: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<Pokemons| null>(null)
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    let cancel = false
    setLoading(true)

    getPokemons(/*page*/).then(data => {
      if (!cancel) {
        setPokemons(data)
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
          pokemons && pokemons.results.map(pokemon => <p key={pokemon.name}>{pokemon.name}</p>)
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
