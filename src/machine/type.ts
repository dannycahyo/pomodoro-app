type PomodoroMachineContext = {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
  workCount: number;
  elapsed: number;
  intervalTimer: number;
};

type PomodoroMachineState =
  | {
      value: "run";
      context: PomodoroMachineContext;
    }
  | {
      value: "paused";
      context: PomodoroMachineContext;
    }
  | {
      value: { run: "focus" };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: { focus: "idle" } };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: { focus: "runTimer" } };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: "shortBreak" };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: { shortBreak: "idle" } };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: { shortBreak: "runTimer" } };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: "longBreak" };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: { longBreak: "idle" } };
      context: PomodoroMachineContext;
    }
  | {
      value: { run: { longBreak: "runTimer" } };
      context: PomodoroMachineContext;
    };

type PomodoroMachineEvent =
  | { type: "TICK" }
  | { type: "START_SHORT_BREAK" }
  | { type: "START_TIMER" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET" }
  | { type: "UPDATE_FOCUS_TIME"; focusTime: number }
  | { type: "UPDATE_SHORT_BREAK_TIME"; shortBreakTime: number }
  | { type: "UPDATE_LONG_BREAK_TIME"; longBreakTime: number }
  | { type: "UPDATE_LONG_BREAK_INTERVAL"; longBreakInterval: number };

export type {
  PomodoroMachineContext,
  PomodoroMachineEvent,
  PomodoroMachineState,
};
