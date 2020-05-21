import React from "react";
import ReactModal from "react-modal";
import "./youLostModal.scss";
import { TEXTS } from "./../../../texts";

function YouLostModal(props) {
  const { isModalOpen, onApproveClick } = props;

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
      <h3>{TEXTS.GamePage.Countdown.YouLostModal.title}</h3>

      <h5>{TEXTS.GamePage.Countdown.YouLostModal.subtitle}</h5>

      <button onClick={() => onApproveClick()}>
        {TEXTS.GamePage.Countdown.YouLostModal.approveButton}
      </button>
    </ReactModal>
  );
}

ReactModal.setAppElement("#root");

export default YouLostModal;
