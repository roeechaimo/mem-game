import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { GameTimeContext } from '../contexts/gameTimeContext';
import firstoreService, { COLLECTIONS } from '../firebase/firestoreService';
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
  const [images, setImages] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [gameTime, setGameTime] = useState({
    gameTime: null,
    postGameTime: (time) => setGameTime({ ...gameTime, gameTime: time }),
  });

  useEffect(() => {
    if (images === null) {
      firstoreService.getBoardImages().then((collection) => {
        let docs = [];
        let defaultBackground;
        collection.forEach((doc) => {
          const { id, src, isDefaultBackground } = doc.data();
          const storagePath = `${COLLECTIONS.images}/${src}`;
          const imageRef = ref(firstoreService.storage, storagePath);
          getDownloadURL(imageRef)
            .then((url) => {
              if (!isDefaultBackground) {
                docs.push({ id, src: url });
              } else {
                defaultBackground = { id, src: url };
              }

              if (docs.length === collection.size - 1) {
                setDefaultImage(defaultBackground);
                setImages(docs);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  }, [images]);

  const buildBoardImages = (cellNumber) => {
    if (cellNumber) {
      const boardCellNumber = cellNumber / 2;
      const slicedImages = images.slice(0, boardCellNumber);
      const slicedImages_1 = images.slice(0, boardCellNumber);
      const imagesDoubbled = [...slicedImages, ...slicedImages_1];

      return setBoardImages(HELPERS.shuffleArray(imagesDoubbled));
    }

    return setBoardImages(cellNumber);
  };

  const setTime = (time) => {
    setTimeInMinutes(time);
  };

  const onChoseBoardModalApproveClick = (pieces) => {
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

  const onGameOver = (title) => {
    buildBoardImages(null);
    if (title) {
      setGameOverModalTitle(title);

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

    setTimeInMinutes(null);

    setIsGameOverModalOpen(true);
  };

  return (
    <div className='container'>
      <GameTimeContext.Provider value={gameTime}>
        <ChoseBoardModal
          isModalOpen={isChoseBoardModalOpen}
          onApproveClick={(pieces) => onChoseBoardModalApproveClick(pieces)}
        />

        <GameOverModal
          isModalOpen={isGameOverModalOpen}
          onApproveClick={() => onGameOverModalApproveClick()}
          title={gameOverModalTitle}
          subtitle={gameOverModalSubtitle}
        />

        <Board
          boardImages={boardImages}
          defaultBackground={defaultImage}
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
