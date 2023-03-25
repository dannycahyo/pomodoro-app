import { useState, useEffect, useRef } from "react";
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
  isRunning?: boolean;
};

export const TimerProgress: React.FC<TimerProgressProps> = ({
  elapsed,
  time,
  isRunning,
}) => {
  const [totalElapsed, setTotalElapsed] = useState(elapsed);
  const [isActive, setIsActive] = useState<boolean>(true);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const remainingTime = time * 60 - Math.floor(totalElapsed);
  const formattedTime = formatTime(remainingTime);

  const tick = (time: number) => {
    setTotalElapsed((prevElapsed) => prevElapsed + time);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      setIsActive(false);
      if (isRunning) {
        previousTimeRef.current = performance.now();
      }
    } else {
      setIsActive(true);
      if (previousTimeRef.current) {
        if (isRunning) {
          const currentTime = performance.now();
          tick((currentTime - previousTimeRef.current) / 1000);
          previousTimeRef.current = undefined;
        }
      }
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(function animate(now) {
      if (isActive && isRunning) {
        if (previousTimeRef.current != null) {
          const timeSinceLastTick = (now - previousTimeRef.current) / 1000;
          tick(timeSinceLastTick);
        }
        previousTimeRef.current = now;
      }
      requestRef.current = requestAnimationFrame(animate);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(requestRef.current!);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, isRunning]);

  return (
    <Box pt="12">
      <CircularProgress
        min={0}
        max={time * 60}
        value={Math.floor(totalElapsed)}
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
