import React, { useEffect, useState } from "react";
import { usePreviousState } from "../../hooks/UsePreviousState";
import "./countdown.scss";

function Countdown(props) {
  const { timeInMinutes } = props;
  const [time, setTime] = useState(
    // new Date(`July 20, 69 00:0${timeInMinutes}:00`)
    { minutes: timeInMinutes, seconds: 0 }
  );

  // const minutes = time.getMinutes();
  // const seconds = time.getSeconds();
  // const countdownParsed = `${minutes}:${seconds}`;

  const prevTimeState = usePreviousState(time);

  // FIXME
  const calculateTime = () => {
    const { minutes, seconds } = time;
    let newMinutes = minutes;
    let newSeconds = seconds;
    if (Number(seconds) > 0 && Number(seconds) < 60) {
      newSeconds = seconds - 1;
    }

    if (
      Number(minutes) > 0 &&
      Number(seconds) === 0 &&
      Number(prevTimeState.seconds) === 1
    ) {
      newMinutes = minutes - 1;
    }

    return { minutes: newMinutes, seconds: newSeconds };
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      const { minutes, seconds } = calculateTime();
      if (Number(minutes) === 0 && Number(seconds) === 0) {
        // TODO - popup
        return console.log("Game over, you lost.");
      }

      setTime({ minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="counter-wrapper">
      <span>{`${time.minutes.toString()}:${time.seconds.toString()}`}</span>
    </div>
  );
}

export default Countdown;
