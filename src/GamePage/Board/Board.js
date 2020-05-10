import React from "react";
import "./Board.scss";
import { IMAGES, BLACK_BACKGROUND } from "./../../appData/images";
import { HELPERS } from "../../helpers";

function Cell(props) {
  const { imageUrl } = props;
  const blackBackground = BLACK_BACKGROUND;

  return (
    <div class="cell-wrapper">
      <img src={imageUrl} alt={blackBackground} />
    </div>
  );
}

function Board(props) {
  const { cellNumber = 0 } = props;
  const shuffeledImages = HELPERS.shuffleArray(IMAGES);
  let images = [];
  if (cellNumber > 0) {
    images = shuffeledImages.slice(0, cellNumber);
  }

  return (
    <div className="board-container">
      {images.map(image => (
        <Cell key={image.id} imageUrl={image.src} />
      ))}
    </div>
  );
}

export default Board;
