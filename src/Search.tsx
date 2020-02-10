import React from "react";
import "./style.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  useHistory
} from "react-router-dom";

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
  const history = useHistory();
  const [search, setSearch] = React.useState("");
  const [characters, setCharacters] = React.useState<Characters>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getSearchResult(search)
      .then(data => {
        setCharacters(data);
        setError(false)
      })
      .catch(() => {
        setError(true);
      });
  }, [search]);

    return (
      <div className="App">
        <div className="divButtonStyle">
          <input type="text" style={{width: 200, height: 30, fontSize: 20}} className="inputSearch" onChange={e => setSearch(e.target.value)}/>
          <button onClick={() => history.goBack()} className="btnSearch">Back to home page</button>
        </div>
        <div className="mainContainer">
          {!error ?(
            characters && characters.results.map(
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
          )
        ) : (
          <p className="center">No character</p> 
        )}
        </div>
      </div>      
    );
  };
  
export default Search;