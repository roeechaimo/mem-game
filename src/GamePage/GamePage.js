import React from "react";
import Board from "./Board/Board";
import Countdown from "./Counter/Countdown";
import "./gamePage.scss";

function GamePage() {
  return (
    <div className="container">
      <Board cellNumber={16} />

      <Countdown timeInMinutes={1} />
    </div>
  );
}

export default GamePage;
