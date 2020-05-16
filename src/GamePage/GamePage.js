import React from "react";
import ReactModal from "react-modal";
import Board from "./Board/Board";
import Countdown from "./Counter/Countdown";
import "./gamePage.scss";

function GamePage() {
  // TODO - fix modal and render on beggining and end of game

  return (
    <div className="container">
      <ReactModal
        isOpen={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <p>Modal Content</p>
      </ReactModal>

      <Board cellNumber={16} />

      <Countdown timeInMinutes={1} />

      <button onClick={()}></button>
    </div>
  );
}

ReactModal.setAppElement("#root");

export default GamePage;
