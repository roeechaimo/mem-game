import React, { useState } from "react";
import ReactModal from "react-modal";
import "./choseBoardModal.scss";
import { TEXTS } from "./../../../texts";
import AppButton from "../../../appButton/AppButton";

function ChoseBoardModal(props) {
  const { isModalOpen, onApproveClick } = props;
  const [pieces, setPieces] = useState(16);

  const selectPieces = piecesNumber => {
    setPieces(piecesNumber);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="app-modal"
    >
      <h3>{TEXTS.GamePage.ChoseBoardModal.title}</h3>

      <h5>{TEXTS.GamePage.ChoseBoardModal.subtitle}</h5>

      <div className="option-wrapper" id="1" onClick={() => selectPieces(16)}>
        <span className={pieces === 16 ? "selected" : ""}>16</span>
      </div>

      <div className="option-wrapper" id="2" onClick={() => selectPieces(32)}>
        <span className={pieces === 32 ? "selected" : ""}>32</span>
      </div>

      <AppButton
        text={TEXTS.GamePage.ChoseBoardModal.approveButton}
        onClick={() => onApproveClick(pieces)}
      />
    </ReactModal>
  );
}

ReactModal.setAppElement("#root");

export default ChoseBoardModal;
