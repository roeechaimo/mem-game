import React, { useState } from 'react';
import ReactModal from 'react-modal';
import AppButton from '../../../appButton/AppButton';
import Toggle from '../../../components/Toggle/Toggle';
import { TEXTS } from './../../../texts';
import './choseBoardModal.scss';

function ChoseBoardModal(props) {
  const { isModalOpen, onApproveClick } = props;
  const [pieces, setPieces] = useState(16);
  const [isCounterEnabled, setIsCounterEnabled] = useState(false);

  const selectPieces = (piecesNumber) => {
    setPieces(piecesNumber);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className='app-modal'
    >
      <h3>{TEXTS.GamePage.ChoseBoardModal.title}</h3>

      <h5>{TEXTS.GamePage.ChoseBoardModal.subtitle}</h5>

      <div
        className='option-wrapper'
        id='1'
        onClick={() => selectPieces(16)}
      >
        <span className={pieces === 16 ? 'selected' : ''}>16</span>
      </div>

      <div
        className='option-wrapper'
        id='2'
        onClick={() => selectPieces(32)}
      >
        <span className={pieces === 32 ? 'selected' : ''}>32</span>
      </div>

      <Toggle
        isOn={isCounterEnabled}
        handleToggle={() => setIsCounterEnabled(!isCounterEnabled)}
        label='Enable counter'
        id='counter-toggle'
      />

      <AppButton
        text={TEXTS.GamePage.ChoseBoardModal.approveButton}
        onClick={() => onApproveClick(pieces)}
      />
    </ReactModal>
  );
}

ReactModal.setAppElement('#root');

export default ChoseBoardModal;
