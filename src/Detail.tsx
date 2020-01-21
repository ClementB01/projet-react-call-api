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
            <img className="imgStyle" src={character.image} alt="No image" width="100" height="100" />
            <span className="spanStyle">{character.name}</span>
            <p>Status : {character.status}</p>
            <p>Species : {character.species}</p>
            <p>Gender : {character.gender}</p>
            <p>Created : {character.created}</p>
          </div>
        ) : (
          <p>No character detail</p>
        )}
      </div>
    )
}

export default Detail;