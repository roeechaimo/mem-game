import React, { useState } from "react";
import "./GamePage.scss";

// TODO
function Countdown(props) {
  const { timeInSeconds } = props;
  const [counter, setCounter] = useState(timeInSeconds);

  return (
    <div className="counter-wrapper">
      <span>{counter}</span>
    </div>
  );
}

export default Countdown;
