import React, { useState } from "react";
import ReactModal from "react-modal";
import Board from "./Board/Board";
import Countdown from "./Counter/Countdown";
import "./gamePage.scss";
import ChoseBoardModal from "./modals/ChoseBoardModal/ChoseBoardModal";
import YouLostModal from "./modals/YouLostModal/YouLostModal";

function GamePage() {
  const [timeInMinutes, setTimeInMinutes] = useState(null);
  const [isChoseBoardModalOpen, setIsChoseBoardModalOpen] = useState(true);
  const [isYouLostModalOpen, setIsYouLostModalOpen] = useState(false);
  const [cellNumber, setCellNumber] = useState(0);

  const setTime = time => {
    setTimeInMinutes(time);
  };

  const onChoseBoardModalApproveClick = pieces => {
    setIsChoseBoardModalOpen(false);
    let time = 1;
    let cells = 16;

    if (pieces === 32) {
      time = 2;
      cells = 32;
    }

    setTime(time);

    setCellNumber(cells);
  };

  const onYouLostModalApproveClick = () => {
    setIsYouLostModalOpen(false);

    setIsChoseBoardModalOpen(true);
  };

  const onTimeIsUp = () => {
    setCellNumber(0);

    setTimeInMinutes(null);

    setIsYouLostModalOpen(true);
  };

  return (
    <div className="container">
      <ChoseBoardModal
        isModalOpen={isChoseBoardModalOpen}
        onApproveClick={pieces => onChoseBoardModalApproveClick(pieces)}
      />

      <YouLostModal
        isModalOpen={isYouLostModalOpen}
        onApproveClick={() => onYouLostModalApproveClick()}
      />

      <Board cellNumber={cellNumber} />

      {timeInMinutes && (
        <Countdown
          timeInMinutes={timeInMinutes}
          onTimeIsUp={() => onTimeIsUp()}
        />
      )}
    </div>
  );
}

ReactModal.setAppElement("#root");

export default GamePage;
