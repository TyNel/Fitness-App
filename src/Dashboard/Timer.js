import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setTime({
      time,
    });
  };

  return (
    <div>
      <Box ml={5}>
        <CountdownCircleTimer
          key={key}
          size={120}
          isPlaying
          duration={time.time ? time.time : 0}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </Box>
      <Box sx={{ mt: 3.5 }}>
        <Slider
          key={key}
          aria-label="Seconds"
          defaultValue={0}
          valueLabelDisplay="auto"
          step={10}
          marks
          max={120}
          onChange={handleTimeChange}
        />
        <Box sx={{ display: "flex" }}>
          <Box>
            <Button
              onClick={() => setKey((prevKey) => prevKey + 1)}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Time
            </Button>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Button
              style={{ backgroundColor: "#9E9E9E" }}
              onClick={() => {
                setKey((prevKey) => prevKey + 1);
                setTime(0);
              }}
              variant="contained"
              startIcon={<RefreshIcon />}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
