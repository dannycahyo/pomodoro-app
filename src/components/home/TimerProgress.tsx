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
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

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
            {formatTime(Math.floor(elapsed))}
          </Heading>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};
