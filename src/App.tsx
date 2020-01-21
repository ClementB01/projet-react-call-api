import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Characters from './Characters';
import Character from './Character';

export default function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route 
            path={"/character/:characterId"}
            component={Character} />
        </Switch>
    </Router>
  );
}