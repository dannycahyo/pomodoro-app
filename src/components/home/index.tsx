import { useState } from "react";
import {
  Container,
  Heading,
  Tag,
  TagLabel,
  TagRightIcon,
  Center,
  VStack,
  Input,
} from "@chakra-ui/react";
import { match } from "ts-pattern";
import { BsPencil } from "react-icons/bs";

import { PomodoroMachineContext } from "../../context/pomodoroMachineContext";
import { TimerProgress } from "./TimerProgress";
import { TimerInfo } from "./TimerInfo";

import type { PomodoroMachineState } from "../../machine/type";

const Home = () => {
  const [state, send] = PomodoroMachineContext.useActor();
  const [task, setTask] = useState({
    isEditing: false,
    value: "",
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((task) => ({
      ...task,
      value: e.target.value,
    }));
  };

  const handleEditTask = () => {
    setTask((task) => ({
      ...task,
      isEditing: !task.isEditing,
    }));
  };

  const handleStartTimer = () => send({ type: "START_TIMER" });
  const handlePause = () => send({ type: "PAUSE" });
  const handleResume = () => send({ type: "RESUME" });

  let historyState: string = "";

  if (typeof state.historyValue?.states === "object") {
    if (state.historyValue.states !== undefined) {
      historyState = Object.keys(
        state.historyValue.states.run?.current || {}
      )[0];
    }
  }

  return (
    <Container centerContent>
      <Center>
        <VStack>
          <Heading size="lg" color="#83A5F7" pb="6">
            Pomodoro Timer
          </Heading>
          {task.isEditing ? (
            <Input
              color="white"
              value={task.value}
              onChange={handleTaskChange}
              onBlur={handleEditTask}
            />
          ) : (
            <>
              <Tag
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                py="2"
                px="4"
              >
                <TagLabel>
                  {task.value === "" ? "What's your task!" : task.value}
                </TagLabel>
                <TagRightIcon
                  _hover={{ cursor: "pointer" }}
                  as={BsPencil}
                  onClick={handleEditTask}
                />
              </Tag>
            </>
          )}
        </VStack>
      </Center>

      {match<PomodoroMachineState>(state as PomodoroMachineState)
        .with(
          { value: { run: { focus: "idle" } } },
          ({ context: { elapsed, focusTime } }) => (
            <>
              <TimerProgress elapsed={elapsed} time={focusTime} />
              <TimerInfo
                isRunning={false}
                onStart={handleStartTimer}
                session="Focus Time"
              />
            </>
          )
        )
        .with(
          { value: { run: { focus: "runTimer" } } },
          ({ context: { elapsed, focusTime } }) => (
            <>
              <TimerProgress elapsed={elapsed} time={focusTime} />
              <TimerInfo
                isRunning={true}
                onPause={handlePause}
                session="Focus Time"
              />
            </>
          )
        )
        .with(
          { value: { run: { shortBreak: "idle" } } },
          ({ context: { elapsed, shortBreakTime } }) => (
            <>
              <TimerProgress elapsed={elapsed} time={shortBreakTime} />
              <TimerInfo
                isRunning={false}
                onStart={handleStartTimer}
                session="Short Break Time"
              />
            </>
          )
        )
        .with(
          { value: { run: { shortBreak: "runTimer" } } },
          ({ context: { elapsed, shortBreakTime } }) => (
            <>
              <TimerProgress elapsed={elapsed} time={shortBreakTime} />
              <TimerInfo
                isRunning={true}
                onPause={handlePause}
                session="Short Break Time"
              />
            </>
          )
        )
        .with(
          { value: { run: { longBreak: "idle" } } },
          ({ context: { elapsed, longBreakTime } }) => (
            <>
              <TimerProgress elapsed={elapsed} time={longBreakTime} />
              <TimerInfo
                isRunning={false}
                onStart={handleStartTimer}
                session="Long Break Time"
              />
            </>
          )
        )
        .with(
          { value: { run: { longBreak: "runTimer" } } },
          ({ context: { elapsed, longBreakTime } }) => (
            <>
              <TimerProgress elapsed={elapsed} time={longBreakTime} />
              <TimerInfo
                isRunning={true}
                onPause={handlePause}
                session="Long Break Time"
              />
            </>
          )
        )
        .with(
          { value: "paused" },
          ({
            context: { elapsed, focusTime, shortBreakTime, longBreakTime },
          }) => {
            const state = {
              focus: focusTime,
              shortBreak: shortBreakTime,
              longBreak: longBreakTime,
            };
            const prevState = historyState as keyof typeof state;
            const time: number = state[prevState];

            return (
              <>
                <TimerProgress elapsed={elapsed} time={time} />
                <TimerInfo
                  isRunning={false}
                  onStart={handleResume}
                  session="Paused"
                />
              </>
            );
          }
        )
        .with({ value: "run" }, () => null)
        .with({ value: { run: "focus" } }, () => null)
        .with({ value: { run: "shortBreak" } }, () => null)
        .with({ value: { run: "longBreak" } }, () => null)
        .exhaustive()}
    </Container>
  );
};

export default Home;
