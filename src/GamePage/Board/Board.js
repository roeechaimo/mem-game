import React, { useState, useEffect } from "react";
import "./Board.scss";
import { IMAGES, BLACK_BACKGROUND } from "./../../appData/images";
import { HELPERS } from "../../helpers";

function Cell(props) {
  const { imageUrl, isActive, onCellClick, index } = props;
  const blackBackground = BLACK_BACKGROUND.src;
  const src = isActive ? imageUrl : blackBackground;

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
  const [activeCell, setActiveCell] = useState(null);
  const [secondCell, setSecondCell] = useState(null);
  const [boardImages, setBoardImages] = useState(null);
  useEffect(() => {});

  const onCellClick = cellIndex => {
    if (!activeCell || !secondCell) {
      if (activeCell === null) {
        return setActiveCell(cellIndex);
      }

      // TODO
      if (boardImages[activeCell].id === boardImages[cellIndex].id) {
        return;
      }

      return setSecondCell(cellIndex);
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
            isActive={activeCell === index || secondCell === index}
            imageUrl={image.src}
            onCellClick={cell => onCellClick(cell)}
            index={index}
          />
        ))}
    </div>
  );
}

export default Board;
