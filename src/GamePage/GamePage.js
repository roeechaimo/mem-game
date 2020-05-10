import React from "react";
import { TEXTS } from "./../texts";
import "./GamePage.scss";
import Board from "./Board/Board";

function GamePage() {
  return (
    <div className="container">
      <h1>{TEXTS.GamePage.title}</h1>

      <Board cellNumber={16} />
    </div>
  );
}

export default GamePage;
