import {
  Box,
  Container,
  Heading,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";
import { PomodoroMachineContext } from "../../context/pomodoroMachineContext";
import SelectOption from "./SelectOption";

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

  const pomodoroSettingOptions = [
    {
      label: "Focus Time",
      time: focusTime,
      onChange: handleFocusTimeChange,
      options: [25, 30, 50],
    },
    {
      label: "Short Break",
      time: shortBreakTime,
      onChange: handleShortBreakTimeChange,
      options: [5, 10, 15],
    },
    {
      label: "Long Break",
      time: longBreakTime,
      onChange: handleLongBreakTimeChange,
      options: [15, 20, 25],
    },
  ];

  return (
    <Container centerContent>
      <Heading size="lg" color="#83A5F7" pb="10">
        Add New Timer
      </Heading>
      <VStack gap={2}>
        {pomodoroSettingOptions.map((pomodoroOption) => (
          <SelectOption
            key={pomodoroOption.label}
            label={pomodoroOption.label}
            time={pomodoroOption.time}
            options={pomodoroOption.options}
            onChange={pomodoroOption.onChange}
          />
        ))}
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
