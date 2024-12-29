import React from 'react';
import './Toggle.scss';

const Toggle = ({ isOn, handleToggle, label, id }) => {
  return (
    <div className='toggle-container'>
      {label && (
        <label
          htmlFor={id}
          className='toggle-label'
        >
          {label}
        </label>
      )}

      <div
        className='toggle-switch'
        onClick={handleToggle}
        role='switch'
        aria-checked={isOn}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <input
          type='checkbox'
          checked={isOn}
          onChange={handleToggle}
          className='toggle-input'
          id={id}
        />

        <span className='toggle-slider'></span>
      </div>
    </div>
  );
};

export default Toggle;
