import React from "react";
import "./appButton.scss";

function AppButton(props) {
  const { text, onClick } = props;

  return (
    <button className="app-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default AppButton;
