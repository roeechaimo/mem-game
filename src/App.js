import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { ROUTES } from "./routes";
import AppHeader from "./AppHeader/AppHeader";

function App() {
  return (
    <div className="app">
      <Router>
        <AppHeader />

        <Switch>
          {ROUTES.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              render={props => <route.component {...props} />}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
