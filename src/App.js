import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { ROUTES } from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            {ROUTES.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                render={props => <route.component {...props} />}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
