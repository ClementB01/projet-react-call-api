import React from "react";
import "./Character";
import "./characterContainer.css";
import "./Characters.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

type Info = {
  count: number;
  pages: number;
};

type Characters = {
  info: Info;
  results: Array<{
    id: number;
    name: string;
    image: string;
  }>;
};

const getCharacters = (page: number | string) =>
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`, {
    headers: { Accept: "application/json" }
  }).then<Characters>(res => res.json());

const App: React.FC = () => {
  const [characters, setCharacters] = React.useState<Characters | null>(null);
  const [loading, setLoading] = React.useState(false);
  //const [page, setPage] = React.useState(1);

  let p = 1;
  let { numPage } = useParams();
  if (numPage) {
    p = Number(numPage);
  }

  React.useEffect(() => {
    let cancel = false;
    setLoading(true);

    if (p) {
      getCharacters(p).then(data => {
        if (!cancel) {
          setCharacters(data);
          setLoading(false);
        }
      });
    }

    return () => {
      cancel = true;
    };
  }, [p]);

  let buttonNext;
  if (p < 25) {
    buttonNext = (
      <Link to={`/${p + 1}`}>
        <button disabled={loading}>Next</button>
      </Link>
    );
  } else {
    buttonNext = <button disabled={true}>Next</button>;
  }

  let buttonPrevious;
  if (p > 1) {
    buttonPrevious = (
      <Link to={`/${p - 1}`}>
        <button disabled={loading}>Previous</button>
      </Link>
    );
  } else {
    buttonPrevious = <button disabled={true}>Previous</button>;
  }

  return (
    <div className="App">
      <div className="divButtonStyle">
        {buttonPrevious}
        {buttonNext}
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        characters &&
        characters.results.map(character => (
          <Link
            to={`/character/${character.id}`}
            className="linkWithoutTextDecoration"
          >
            <div key={character.id} className="characterContainer">
              <img
                className="imgStyle"
                src={character.image}
                alt="No image"
                width="40"
                height="40"
              />
              <span className="spanStyle">{character.name}</span>
            </div>
          </Link>
        ))
      )}
      <div className="divButtonStyle">
        {buttonPrevious}
        {buttonNext}
      </div>
    </div>
  );
};

export default App;
