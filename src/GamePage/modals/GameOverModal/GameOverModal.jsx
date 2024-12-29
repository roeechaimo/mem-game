import React from 'react';
import ReactModal from 'react-modal';
import AppButton from '../../../appButton/AppButton';
import { TEXTS } from '../../../texts';
import './gameOverModal.scss';

function GameOverModal(props) {
  const { isModalOpen, onApproveClick, title, subtitle } = props;

  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className='app-modal'
    >
      <h3>{title}</h3>

      <h5>{subtitle || ''}</h5>

      <AppButton
        text={TEXTS.GamePage.Countdown.GameOverModal.approveButton}
        onClick={() => onApproveClick()}
      />
    </ReactModal>
  );
}

ReactModal.setAppElement('#root');

export default GameOverModal;
