import React from "react";
import { Link } from "react-router-dom";
import { TEXTS } from "./../texts";
import "./appHeader.scss";

function AppHeader() {
  return (
    <div className="header-container">
      <nav>
        <div className="header-item active">
          <Link to="/">{TEXTS.AppHeader.gamePage}</Link>
        </div>
      </nav>
    </div>
  );
}

export default AppHeader;
