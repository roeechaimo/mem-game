import React, { useEffect, useState } from "react";
import { usePreviousState } from "../../hooks/UsePreviousState";
import { TEXTS } from "../../texts";
import { BLACK_BACKGROUND } from "./../../appData/images";
import "./board.scss";

function Cell(props) {
  const { imageUrl, isRevealed, onCellClick, index, style } = props;
  const blackBackground = BLACK_BACKGROUND.src;

  const src = isRevealed ? imageUrl : blackBackground;

  const onClick = index => {
    typeof onCellClick === "function" && onCellClick(index);
  };

  return (
    <div className="cell-wrapper" onClick={() => onClick(index)} style={style}>
      <img src={src} alt={blackBackground} />
    </div>
  );
}

function Board(props) {
  const [imagesState, setImagesState] = useState({
    activeCells: [null, null],
    revealedImages: []
  });

  const { boardImages, onGameOver } = props;

  const prevImagesState = usePreviousState(imagesState);

  useEffect(() => {
    let timeout;

    if (
      imagesState.activeCells[0] !== null &&
      imagesState.activeCells[1] !== null &&
      prevImagesState.revealedImages.length ===
        imagesState.revealedImages.length
    ) {
      timeout = setTimeout(() => {
        setImagesState(prevState => ({
          ...prevState,
          activeCells: [null, null]
        }));
      }, 2000);
    }

    if (imagesState?.revealedImages?.length * 2 === boardImages?.length) {
      setImagesState(prevState => ({
        ...prevState,
        revealedImages: []
      }));

      typeof onGameOver === "function" &&
        onGameOver(TEXTS.GamePage.Countdown.GameOverModal.YouWinTitle);
    }

    if (boardImages === null && prevImagesState?.revealedImages?.length > 0) {
      setImagesState(prevState => ({
        ...prevState,
        revealedImages: []
      }));
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [imagesState, prevImagesState, onGameOver, boardImages]);

  const onCellClick = cellIndex => {
    if (
      imagesState.activeCells[0] === null ||
      imagesState.activeCells[1] === null
    ) {
      if (imagesState.activeCells[0] === null) {
        return setImagesState(prevState => ({
          ...prevState,
          activeCells: [cellIndex, null]
        }));
      }

      if (
        boardImages[imagesState.activeCells[0]].id ===
          boardImages[cellIndex].id &&
        imagesState.activeCells[0] !== cellIndex
      ) {
        let copyOfRevealedImages = [...imagesState.revealedImages];
        if (!copyOfRevealedImages.includes(boardImages[cellIndex].id)) {
          copyOfRevealedImages.push(boardImages[cellIndex].id);

          return setImagesState(prevState => ({
            ...prevState,
            activeCells: [null, null],
            revealedImages: copyOfRevealedImages
          }));
        }
      }

      if (
        imagesState.activeCells[0] !== null &&
        imagesState.activeCells[1] === null
      ) {
        return setImagesState(prevState => ({
          ...prevState,
          activeCells: [imagesState.activeCells[0], cellIndex]
        }));
      }
    }
  };

  return (
    <div
      className="board-container"
      style={{ width: boardImages?.length === 32 ? "100%" : {} }}
    >
      {boardImages &&
        boardImages.map((image, index) => (
          <Cell
            key={index}
            isRevealed={
              imagesState.activeCells[0] === index ||
              imagesState.activeCells[1] === index ||
              imagesState.revealedImages.includes(image.id)
            }
            imageUrl={image.src}
            onCellClick={cell => onCellClick(cell)}
            index={index}
            style={{ flexBasis: boardImages?.length === 32 ? "12.5%" : {} }}
          />
        ))}
    </div>
  );
}

export default Board;
