import React, { useState } from "react";
import ReactModal from "react-modal";
import { IMAGES } from "../appData/images";
import { HELPERS } from "../helpers";
import Board from "./Board/Board";
import Countdown from "./Counter/Countdown";
import "./gamePage.scss";
import ChoseBoardModal from "./modals/ChoseBoardModal/ChoseBoardModal";
import YouLostModal from "./modals/YouLostModal/YouLostModal";

function GamePage() {
  const [timeInMinutes, setTimeInMinutes] = useState(null);
  const [isChoseBoardModalOpen, setIsChoseBoardModalOpen] = useState(true);
  const [isYouLostModalOpen, setIsYouLostModalOpen] = useState(false);
  const [boardImages, setBoardImages] = useState(null);

  const buildBoardImages = cellNumber => {
    if (cellNumber) {
      const boardCellNumber = cellNumber / 2;
      const slicedImages = IMAGES.slice(0, boardCellNumber);
      const slicedImages_1 = IMAGES.slice(0, boardCellNumber);
      const imagesDoubbled = [...slicedImages, ...slicedImages_1];

      setBoardImages(HELPERS.shuffleArray(imagesDoubbled));
    }
  };

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

    buildBoardImages(cells);
  };

  const onYouLostModalApproveClick = () => {
    setIsYouLostModalOpen(false);

    setIsChoseBoardModalOpen(true);
  };

  const onTimeIsUp = () => {
    buildBoardImages(0);

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

      <Board boardImages={boardImages} />

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
