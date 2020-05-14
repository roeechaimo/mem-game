import React, { useEffect, useState } from "react";
import { HELPERS } from "../../helpers";
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

  useEffect(() => {
    let timeout;

    if (imagesState.activeCells[0] && imagesState.activeCells[1]) {
      timeout = setTimeout(() => {
        setImagesState({
          activeCells: [null, null],
          revealedImages: imagesState.revealedImages
        });
      }, 3000);
    }

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [imagesState]);

  // FIXME - bug after match
  const onCellClick = cellIndex => {
    if (!imagesState.activeCells[0] || !imagesState.activeCells[1]) {
      if (imagesState.activeCells[0] === null) {
        return setImagesState({
          activeCells: [cellIndex, null],
          revealedImages: imagesState.revealedImages
        });
      }

      if (
        boardImages[imagesState.activeCells[0]].id === boardImages[cellIndex].id
      ) {
        let copyOfRevealedImages = [...imagesState.revealedImages];
        copyOfRevealedImages.push(boardImages[cellIndex].id);

        return setImagesState({
          activeCells: imagesState.activeCells,
          revealedImages: copyOfRevealedImages
        });
      }

      return setImagesState({
        activeCells: [imagesState.activeCells[0], cellIndex],
        revealedImages: imagesState.revealedImages
      });
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
