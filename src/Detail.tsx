import React from 'react';
import './detailCharacter.css'

type Character = {
    id: number
    name: string
    status: string
    species: string
    gender: string
    image: string
    created: string
}

const getCharacter = (id = 12) =>
  fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    headers: { Accept: 'application/json' },
  }).then<Character>(res => res.json())

const Detail: React.FC = () => {
  const [character, setCharacter] = React.useState<Character>()

  React.useEffect(() => {
    getCharacter().then(data => {
        setCharacter(data)
    })
  })

  return (
      <div className="App">
        {character ? (
          <div key={character.id} className="characterContainer">
            <img className="imgStyle" src={character.image} alt="No image" width="40" height="40" />
            <span className="spanStyle">{character.name}</span>
            <div className="spanStyle">Status : {character.status}</div>
            <div className="spanStyle">Species : {character.species}</div>
            <div className="spanStyle">Gender : {character.gender}</div>
            <div className="spanStyle">Created : {character.created}</div>
          </div>
        ) : (
          <p>No character detail</p>
        )}
      </div>
    )
}

export default Detail;