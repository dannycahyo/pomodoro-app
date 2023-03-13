import { Heading, Center, VStack, IconButton } from "@chakra-ui/react";
import { BsPause, BsPlay } from "react-icons/bs";

import type React from "react";

type TimerInfoProps = {
  session?: string;
  isRunning: boolean;
  onStart?: () => void;
  onPause?: () => void;
};

export const TimerInfo: React.FC<TimerInfoProps> = ({
  session,
  isRunning,
  onStart,
  onPause,
}) => {
  return (
    <Center pt="12">
      <VStack gap={8}>
        <Heading size="md" color="#83A5F7">
          {session}
        </Heading>
        {isRunning ? (
          <IconButton
            colorScheme="blue"
            aria-label="Pause Button"
            size="lg"
            icon={<BsPause />}
            fontSize="2xl"
            onClick={onPause}
          />
        ) : (
          <IconButton
            colorScheme="blue"
            aria-label="Start Button"
            size="lg"
            icon={<BsPlay />}
            fontSize="2xl"
            onClick={onStart}
          />
        )}
      </VStack>
    </Center>
  );
};
