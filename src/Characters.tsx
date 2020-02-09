import "./style.css";
import React from "react";
import "./Character";
import CharacterDiv, {CharacterDivProps} from "./CharacterDiv"

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



const getCharacters = (page: number | string) =>
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`, {
    headers: { Accept: "application/json" }
  }).then<Characters>(res => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });

const App: React.FC = () => {
  const [error, setError] = React.useState(false);
  const [characters, setCharacters] = React.useState<Characters>();
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
      setError(false);
      getCharacters(p)
        .then(data => {
          if (!cancel) {
            setCharacters(data);
            setLoading(false);
          }
        })
        .catch(() => {
          setError(true);
        });
    }

    return () => {
      cancel = true;
    };
  }, [p]);

  let buttonPrevious;
  let buttonNext;

  if (characters) {
    if (characters.info.prev) {
      buttonPrevious = (
        <Link to={`/${p - 1}`}>
          <button disabled={loading}>Previous</button>
        </Link>
      );
    } else {
      buttonPrevious = <button disabled={true}>Previous</button>;
    }

    if (characters.info.next) {
      buttonNext = (
        <Link to={`/${p + 1}`}>
          <button disabled={loading}>Next</button>
        </Link>
      );
    } else {
      buttonNext = <button disabled={true}>Next</button>;
    }
  }

  return p && !error ? (
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
          <CharacterDiv characterProps = { character }/>
        ))
      )}
      <div className="divButtonStyle">
        {buttonPrevious}
        {buttonNext}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default App;
