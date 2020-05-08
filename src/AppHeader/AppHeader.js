import React from "react";
import { Link } from "react-router-dom";
import { TEXTS } from "./../texts";
import "./AppHeader.scss";

function AppHeader() {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">{TEXTS.AppHeader.gamePage}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppHeader;
