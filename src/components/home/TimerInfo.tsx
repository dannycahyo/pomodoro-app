import { Heading, Center, VStack, IconButton, HStack } from "@chakra-ui/react";
import { BsPause, BsPlay } from "react-icons/bs";
import { MdRestartAlt } from "react-icons/md";

import type React from "react";

type TimerInfoProps = {
  session?: string;
  isRunning: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
};

export const TimerInfo: React.FC<TimerInfoProps> = ({
  session,
  isRunning,
  onStart,
  onPause,
  onReset,
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
          <HStack gap={4}>
            <IconButton
              colorScheme="blue"
              aria-label="Start Button"
              size="lg"
              icon={<BsPlay />}
              fontSize="2xl"
              onClick={onStart}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Reset Button"
              size="lg"
              icon={<MdRestartAlt />}
              fontSize="2xl"
              onClick={onReset}
            />
          </HStack>
        )}
      </VStack>
    </Center>
  );
};