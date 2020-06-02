import React from "react";
import ReactModal from "react-modal";
import "./gameOverModal.scss";
import { TEXTS } from "../../../texts";
import AppButton from "../../../appButton/AppButton";

function GameOverModal(props) {
  const { isModalOpen, onApproveClick, title } = props;

  // TODO - style
  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {},
        content: { top: "30%", right: "30%", bottom: "30%", left: "30%" }
      }}
    >
      <h3>{title}</h3>

      <h5>{TEXTS.GamePage.Countdown.GameOverModal.subtitle}</h5>

      <AppButton
        text={TEXTS.GamePage.Countdown.GameOverModal.approveButton}
        onClick={() => onApproveClick()}
      />
    </ReactModal>
  );
}

ReactModal.setAppElement("#root");

export default GameOverModal;
