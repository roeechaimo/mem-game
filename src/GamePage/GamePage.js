import React, { useState } from "react";
import ReactModal from "react-modal";
import Board from "./Board/Board";
import Countdown from "./Counter/Countdown";
import "./gamePage.scss";
import ChoseBoardModal from "./modals/ChoseBoardModal/ChoseBoardModal";

function GamePage() {
  const [timeInMinutes, setTimeInMinutes] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const setTime = time => {
    setTimeInMinutes(time);
  };

  const onApproveClick = pieces => {
    setIsModalOpen(false);
    let time = 1;

    if (pieces === 32) {
      time = 2;
    }

    setTime(time);
  };

  return (
    <div className="container">
      <ChoseBoardModal
        isModalOpen={isModalOpen}
        onApproveClick={pieces => onApproveClick(pieces)}
      />

      <Board cellNumber={16} />

      {timeInMinutes && <Countdown timeInMinutes={timeInMinutes} />}
    </div>
  );
}

ReactModal.setAppElement("#root");

export default GamePage;
