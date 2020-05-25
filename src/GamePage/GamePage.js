import React, { useState, useCallback } from "react";
import ReactModal from "react-modal";
import { IMAGES } from "../appData/images";
import { HELPERS } from "../helpers";
import Board from "./Board/Board";
import Countdown from "./Counter/Countdown";
import "./gamePage.scss";
import ChoseBoardModal from "./modals/ChoseBoardModal/ChoseBoardModal";
import GameOverModal from "./modals/GameOverModal/GameOverModal";
import { TEXTS } from "../texts";

function GamePage() {
  const [timeInMinutes, setTimeInMinutes] = useState(null);
  const [isChoseBoardModalOpen, setIsChoseBoardModalOpen] = useState(true);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [gameOverModalTitle, setGameOverModalTitle] = useState(
    TEXTS.GamePage.Countdown.GameOverModal.youLostTitle
  );
  const [boardImages, setBoardImages] = useState(null);

  const buildBoardImages = cellNumber => {
    if (cellNumber) {
      const boardCellNumber = cellNumber / 2;
      const slicedImages = IMAGES.slice(0, boardCellNumber);
      const slicedImages_1 = IMAGES.slice(0, boardCellNumber);
      const imagesDoubbled = [...slicedImages, ...slicedImages_1];

      return setBoardImages(HELPERS.shuffleArray(imagesDoubbled));
    }

    return setBoardImages(cellNumber);
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

  const onGameOverModalApproveClick = () => {
    setIsGameOverModalOpen(false);

    setIsChoseBoardModalOpen(true);
  };

  const onGameOver = title => {
    buildBoardImages(0);

    // FIXME - title wont update
    if (title) {
      setGameOverModalTitle(title);
    }

    setTimeInMinutes(null);

    setIsGameOverModalOpen(true);
  };

  return (
    <div className="container">
      <ChoseBoardModal
        isModalOpen={isChoseBoardModalOpen}
        onApproveClick={pieces => onChoseBoardModalApproveClick(pieces)}
      />

      <GameOverModal
        isModalOpen={isGameOverModalOpen}
        onApproveClick={() => onGameOverModalApproveClick()}
        title={gameOverModalTitle}
      />

      <Board
        boardImages={boardImages}
        onGameOver={title => onGameOver(title)}
      />

      {timeInMinutes && (
        <Countdown
          timeInMinutes={timeInMinutes}
          onGameOver={title => onGameOver(title)}
        />
      )}
    </div>
  );
}

ReactModal.setAppElement("#root");

export default GamePage;
