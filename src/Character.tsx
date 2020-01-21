import React from 'react';
import './style.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

type Character = {
    id: number
    name: string
    status: string
    species: string
    gender: string
    image: string
    created: string
}


const getCharacter = (id: number | string) =>
  fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    headers: { Accept: 'application/json' },
  }).then<Character>(res => {
    if (!res.ok) {
      throw new Error()
    }
    return res.json()})

const Detail: React.FC = () => {
  const [character, setCharacter] = React.useState<Character>()
  const [error, setError] = React.useState(false)
  let { characterId: id } = useParams();

  React.useEffect(() => {
    if (id) {
      getCharacter(id).then(data => {

        setCharacter(data)
      }).catch(() => {
        setError(true)
      })
      
    }
  }, [id])

  return id && !error ? (
      <div className="App">
        {character ? (
          <div key={character.id} className="characterDetailContainer">
            <img className="imgStyle" src={character.image} alt="No image" width="100" height="100" />
            <span className="spanStyle">{character.name}</span>
            <p>Status : {character.status}</p>
            <p>Species : {character.species}</p>
            <p>Gender : {character.gender}</p>
            <p>Created : {character.created}</p>
            <div className="divButtonStyle">
              <Link to="/">
                <button>
                  Back to home page
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p>No character detail</p>
        )}
      </div>
    ) : <Redirect to="/" />
}

export default Detail;