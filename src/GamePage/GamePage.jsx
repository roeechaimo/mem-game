import { useState } from 'react';
import ReactModal from 'react-modal';
import { BLACK_BACKGROUND, IMAGES } from '../appData/images';
import { GameTimeContext } from '../contexts/gameTimeContext';
import { HELPERS } from '../helpers';
import { TEXTS } from '../texts';
import Board from './Board/Board';
import Countdown from './Counter/Countdown';
import './gamePage.scss';
import ChoseBoardModal from './modals/ChoseBoardModal/ChoseBoardModal';
import GameOverModal from './modals/GameOverModal/GameOverModal';

function GamePage() {
  const [timeInMinutes, setTimeInMinutes] = useState(null);
  const [isChoseBoardModalOpen, setIsChoseBoardModalOpen] = useState(true);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [gameOverModalTitle, setGameOverModalTitle] = useState(
    TEXTS.GamePage.Countdown.GameOverModal.youLostTitle
  );
  const [gameOverModalSubtitle, setGameOverModalSubtitle] = useState(null);
  const [boardImages, setBoardImages] = useState(null);
  const [gameTime, setGameTime] = useState({
    gameTime: null,
    postGameTime: (time) => setGameTime({ ...gameTime, gameTime: time }),
  });

  const buildBoardImages = (cellNumber) => {
    if (cellNumber) {
      const boardCellNumber = cellNumber / 2;
      const slicedImages = IMAGES.slice(0, boardCellNumber);
      const slicedImages_1 = IMAGES.slice(0, boardCellNumber);
      const imagesDoubbled = [...slicedImages, ...slicedImages_1];

      return setBoardImages(HELPERS.shuffleArray(imagesDoubbled));
    }

    return setBoardImages(cellNumber);
  };

  const setTime = (time) => {
    setTimeInMinutes(time);
  };

  const onChoseBoardModalApproveClick = (pieces, isCounterEnabled) => {
    setIsChoseBoardModalOpen(false);
    let time = 1;
    let cells = 16;

    if (pieces === 32) {
      time = 2;
      cells = 32;
    }

    if (isCounterEnabled) {
      setTime(time);
    }

    buildBoardImages(cells);
  };

  const onGameOverModalApproveClick = () => {
    setIsGameOverModalOpen(false);

    setIsChoseBoardModalOpen(true);
  };

  const onGameOver = (title) => {
    buildBoardImages(null);
    if (title) {
      setGameOverModalTitle(title);

      if (gameTime?.gameTime) {
        const { minutes, seconds } = gameTime?.gameTime;
        let secondsAsStr =
          title === TEXTS.GamePage.Countdown.GameOverModal.YouLostTitle
            ? (seconds - 1)?.toString()
            : seconds;

        if (secondsAsStr?.length === 1) {
          secondsAsStr = `0${secondsAsStr}`;
        }

        setGameOverModalSubtitle(
          `${TEXTS.GamePage.Countdown.GameOverModal.subtitle}0${minutes}:${secondsAsStr}`
        );
      }
    }

    setTimeInMinutes(null);

    setIsGameOverModalOpen(true);
  };

  return (
    <div className='container'>
      <GameTimeContext.Provider value={gameTime}>
        <ChoseBoardModal
          isModalOpen={isChoseBoardModalOpen}
          onApproveClick={(pieces, isCounterEnabled) =>
            onChoseBoardModalApproveClick(pieces, isCounterEnabled)
          }
        />

        <GameOverModal
          isModalOpen={isGameOverModalOpen}
          onApproveClick={() => onGameOverModalApproveClick()}
          title={gameOverModalTitle}
          subtitle={gameOverModalSubtitle}
        />

        <Board
          boardImages={boardImages}
          defaultBackground={BLACK_BACKGROUND}
          onGameOver={(title) => onGameOver(title)}
        />

        {timeInMinutes && !isChoseBoardModalOpen && !isGameOverModalOpen && (
          <Countdown
            timeInMinutes={timeInMinutes}
            onGameOver={(title) => onGameOver(title)}
          />
        )}
      </GameTimeContext.Provider>
    </div>
  );
}

ReactModal.setAppElement('#root');

export default GamePage;
