import React, { useEffect, useState } from "react";
import { usePreviousState } from "../../hooks/UsePreviousState";
import "./countdown.scss";

function Countdown(props) {
  const { timeInMinutes, onTimeIsUp } = props;
  const [time, setTime] = useState({
    minutes: timeInMinutes,
    seconds: 0
  });

  const prevTimeState = usePreviousState(time);

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
  };

  // FIXME - fix onTimeIsUp
  useEffect(() => {
    let interval;
    const { minutes, seconds } = calculateTime();
    if (!(Number(minutes) === 0 && Number(seconds) === 0)) {
      interval = setInterval(() => {
        // const { minutes, seconds } = calculateTime();
        // if (Number(minutes) === 0 && Number(seconds) === 0) {
        //   typeof onTimeIsUp === "function" && onTimeIsUp();

        //   return clearInterval(interval);
        // }

        setTime({ minutes, seconds });
      }, 1000);
    } else if (
      prevTimeState?.seconds !== seconds &&
      prevTimeState?.minutes !== minutes
    ) {
      typeof onTimeIsUp === "function" && onTimeIsUp();
    }

    return () => {
      clearInterval(interval);
    };
  });

  let secondsAsString = time.seconds.toString();
  if (secondsAsString.length < 2) {
    secondsAsString = `0${secondsAsString}`;
  }

  return (
    <div className="counter-wrapper">
      <span>{`${time.minutes.toString()}:${secondsAsString}`}</span>
    </div>
  );
}

export default Countdown;
