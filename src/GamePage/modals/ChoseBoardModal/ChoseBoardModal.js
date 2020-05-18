import React, { useState } from "react";
import ReactModal from "react-modal";
import "./choseBoardModal.scss";
import { TEXTS } from "./../../../texts";

function ChoseBoardModal(props) {
  const { isModalOpen, onApproveClick } = props;
  const [pieces, setPieces] = useState(16);

  const selectPieces = piecesNumber => {
    setPieces(piecesNumber);
  };

  // TODO - style
  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {},
        content: { top: "20%", right: "20%", bottom: "20%", left: "20%" }
      }}
    >
      <h3>{TEXTS.GamePage.ChoseBoardModal.title}</h3>

      <h5>{TEXTS.GamePage.ChoseBoardModal.subtitle}</h5>

      <div
        id="1"
        onClick={() => selectPieces(16)}
        className={pieces === 16 ? "selected" : ""}
      >
        16
      </div>

      <div
        id="2"
        onClick={() => selectPieces(32)}
        className={pieces === 32 ? "selected" : ""}
      >
        32
      </div>

      <button onClick={() => onApproveClick(pieces)}>
        {TEXTS.GamePage.ChoseBoardModal.approveButton}
      </button>
    </ReactModal>
  );
}

ReactModal.setAppElement("#root");

export default ChoseBoardModal;
