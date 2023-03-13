import {
  Box,
  Container,
  Heading,
  VStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";
import { PomodoroMachineContext } from "../context/pomodoroMachineContext";

const Setting = () => {
  const [state, send] = PomodoroMachineContext.useActor();

  const { longBreakInterval, focusTime, longBreakTime, shortBreakTime } =
    state.context;

  const handleFocusTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    send({ type: "UPDATE_FOCUS_TIME", focusTime: Number(e.target.value) });

  const handleShortBreakTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) =>
    send({
      type: "UPDATE_SHORT_BREAK_TIME",
      shortBreakTime: Number(e.target.value),
    });

  const handleLongBreakTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    send({
      type: "UPDATE_LONG_BREAK_TIME",
      longBreakTime: Number(e.target.value),
    });

  const handleLongBreakIntervalChange = (value: string) =>
    send({
      type: "UPDATE_LONG_BREAK_INTERVAL",
      longBreakInterval: Number(value),
    });

  return (
    <Container centerContent minH="70vh">
      <Heading size="lg" color="#83A5F7" pb="10">
        Add New Timer
      </Heading>

      <VStack gap={2}>
        <Box>
          <Text mb="2" color="whiteAlpha.800">
            Focus Time
          </Text>
          <Select
            placeholder="Focus Time"
            color="whiteAlpha.800"
            bg="gray.700"
            borderColor="gray.700"
            borderRadius="full"
            minW={240}
            value={focusTime}
            onChange={handleFocusTimeChange}
          >
            <option value={25}>25 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={50}>50 Minutes</option>
          </Select>
        </Box>
        <Box>
          <Text color="whiteAlpha.800" mb="2">
            Short Break
          </Text>
          <Select
            placeholder="Short Break"
            color="whiteAlpha.800"
            bg="gray.700"
            borderColor="gray.700"
            borderRadius="full"
            minW={240}
            value={shortBreakTime}
            onChange={handleShortBreakTimeChange}
          >
            <option value={5}>5 Minutes</option>
            <option value={10}>10 Minutes</option>
            <option value={15}>15 Minutes</option>
          </Select>
        </Box>
        <Box>
          <Text color="whiteAlpha.800" mb="2">
            Long Break
          </Text>
          <Select
            placeholder="Long Break"
            color="whiteAlpha.800"
            bg="gray.700"
            borderColor="gray.700"
            borderRadius="full"
            minW={240}
            value={longBreakTime}
            onChange={handleLongBreakTimeChange}
          >
            <option value={10}>10 Minutes</option>
            <option value={15}>20 Minutes</option>
            <option value={30}>30 Minutes</option>
          </Select>
        </Box>
        <Box>
          <Text color="whiteAlpha.800" mb="2">
            Intervals
          </Text>
          <NumberInput
            placeholder="Interval"
            color="whiteAlpha.800"
            onChange={handleLongBreakIntervalChange}
            value={longBreakInterval}
            min={2}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper color="whiteAlpha.800" />
              <NumberDecrementStepper color="whiteAlpha.800" />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </VStack>
    </Container>
  );
};

export default Setting;
