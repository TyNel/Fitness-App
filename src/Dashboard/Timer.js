import React, { useState, useRef } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const countRef = useRef(null);

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const handleStart = () => {
    setActive(true);
    setPaused(true);
    if (time > 0) {
      countRef.current = setInterval(() => {
        setTime((timer) => timer - 1);
      }, 1000);
    } else {
      countRef.current = setInterval(() => {
        setTime((timer) => timer + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setPaused(false);
  };

  const handleResume = () => {
    setPaused(true);
    countRef.current = setInterval(() => {
      setTime((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setActive(false);
    setPaused(false);
    setTime(0);
  };

  return (
    <div className="app">
      <div className="stopwatch-card">
        <p>{formatTime(time)}</p>
        <div className="buttons">
          {!isActive && !isPaused ? (
            <button onClick={handleStart}>Start</button>
          ) : isPaused ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handleResume}>Resume</button>
          )}
          <button onClick={handleReset} disabled={!isActive}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
