import React from "react";
import "./style.css";

type Info = {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  
  type Characters = {
    info: Info;
    results: Array<{
      id: number;
      name: string;
      image: string;
    }>;
  };

const getSearchResult = (name: string) =>
  fetch(`https://rickandmortyapi.com/api/character/?name=${name}`, {
    headers: { Accept: "application/json" }
  }).then<Characters>(res => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });

const Search: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [characters, setCharacters] = React.useState<Characters>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getSearchResult(search)
      .then(data => {
        setCharacters(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [search]);

    return !error ?(
      <div className="App">
        <div className="divSearch">
          <input type='text' width="1000" className="inputSearch" onChange={e => setSearch(e.target.value)}/>
        </div>
        {characters && characters.results.map(
          character => (
            <div key={character.id} className="charactersContainer">
              <img
                className="imgStyle"
                src={character.image}
                alt="No image"
                width="40"
                height="40"
              />
              <span className="spanStyle">{character.name}</span>
            </div>
          )
        )}
      </div>
    ) : (
      <p>Error</p>
    );
  };
  
export default Search;