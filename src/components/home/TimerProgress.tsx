import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Heading,
} from "@chakra-ui/react";

import type React from "react";

type TimerProgressProps = {
  elapsed: number;
  time: number;
};

const TimerProgress: React.FC<TimerProgressProps> = ({ elapsed, time }) => {
  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const [timerWorker, setTimerWorker] = useState<Worker | null>(null);
  const [workerTime, setWorkerTime] = useState<number>(elapsed);

  const remainingTime = time * 60 - Math.floor(workerTime);
  const formattedTime = formatTime(remainingTime);

  useEffect(() => {
    if (timerWorker) {
      timerWorker.postMessage(workerTime);
    }
  }, [workerTime]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Worker" in window) {
      const newWorker = new Worker("/worker.js");
      setTimerWorker(newWorker);
      return () => {
        newWorker.terminate();
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkerTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box pt="12">
      <CircularProgress
        min={0}
        max={time * 60}
        value={Math.floor(workerTime)}
        size="180px"
        thickness="12px"
      >
        <CircularProgressLabel paddingTop="12px">
          <Heading size="lg" color="#83A5F7" pb="6">
            {formattedTime}
          </Heading>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};

export { TimerProgress };
