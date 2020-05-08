import React from "react";
import { Link } from "react-router-dom";
import "./AppHeader.scss";

function AppHeader() {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppHeader;
