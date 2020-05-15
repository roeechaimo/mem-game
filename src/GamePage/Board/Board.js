import React, { useEffect, useState } from "react";
import { HELPERS } from "../../helpers";
import { usePreviousState } from "../../hooks/UsePreviousState";
import { BLACK_BACKGROUND, IMAGES } from "./../../appData/images";
import "./Board.scss";

function Cell(props) {
  const { imageUrl, isRevealed, onCellClick, index } = props;
  const blackBackground = BLACK_BACKGROUND.src;
  const src = isRevealed ? imageUrl : blackBackground;

  const onClick = index => {
    typeof onCellClick === "function" && onCellClick(index);
  };

  return (
    <div className="cell-wrapper" onClick={() => onClick(index)}>
      <img src={src} alt={blackBackground} />
    </div>
  );
}

function Board(props) {
  const [imagesState, setImagesState] = useState({
    activeCells: [null, null],
    revealedImages: []
  });
  const [boardImages, setBoardImages] = useState(null);

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

    return () => {
      clearTimeout(timeout);
    };
  }, [imagesState, prevImagesState]);

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

  const { cellNumber = 0 } = props;
  if (cellNumber > 0 && boardImages === null) {
    const boardCellNumber = cellNumber / 2;
    const slicedImages = IMAGES.slice(0, boardCellNumber);
    const slicedImages_1 = IMAGES.slice(0, boardCellNumber);
    const imagesDoubbled = [...slicedImages, ...slicedImages_1];

    setBoardImages(HELPERS.shuffleArray(imagesDoubbled));
  }

  return (
    <div className="board-container">
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
          />
        ))}
    </div>
  );
}

export default Board;
