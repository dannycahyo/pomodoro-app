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

export const TimerProgress: React.FC<TimerProgressProps> = ({
  elapsed,
  time,
}) => {
  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const remainingTime = time * 60 - Math.floor(elapsed);
  const formattedTime = formatTime(remainingTime);

  return (
    <Box pt="12">
      <CircularProgress
        min={0}
        max={time * 60}
        value={Math.floor(elapsed)}
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
