import React, { useEffect, useState, useCallback } from "react";
import { usePreviousState } from "../../hooks/UsePreviousState";
import "./countdown.scss";
import { TEXTS } from "../../texts";

function Countdown(props) {
  const { timeInMinutes, onGameOver } = props;
  const [time, setTime] = useState({
    minutes: timeInMinutes,
    seconds: 0
  });

  const prevTimeState = usePreviousState(time);

  const calculateTime = useCallback(() => {
    const { minutes, seconds } = time;
    let newMinutes = minutes;
    let newSeconds = seconds;
    if (Number(seconds) > 0 && Number(seconds) < 60) {
      newSeconds = seconds - 1;
    }

    if (
      Number(minutes) > 0 &&
      Number(seconds) === 0 &&
      (Number(prevTimeState?.seconds) === 1 ||
        Number(prevTimeState?.seconds) === 0)
    ) {
      newMinutes = minutes - 1;
      newSeconds = 59;
    }

    return {
      minutes: newMinutes,
      seconds: newSeconds
    };
  }, [time, prevTimeState]);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      const { minutes, seconds } = calculateTime();
      if (
        Number(minutes) === 0 &&
        Number(seconds) === 0 &&
        prevTimeState?.seconds !== 1 &&
        prevTimeState?.seconds !== 0
      ) {
        typeof onGameOver === "function" &&
          onGameOver(TEXTS.GamePage.Countdown.GameOverModal.YouLostTitle);

        return clearInterval(interval);
      }

      setTime({ minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time, timeInMinutes, onGameOver, prevTimeState, calculateTime]);

  let secondsAsString = time.seconds.toString();
  if (secondsAsString.length < 2) {
    secondsAsString = `0${secondsAsString}`;
  }

  // FIXME - don't show counter whenn game is over
  return (
    <div className="counter-wrapper">
      <span>{`${time.minutes.toString()}:${
        secondsAsString !== "0" ? secondsAsString : ""
      }`}</span>
    </div>
  );
}

export default Countdown;
