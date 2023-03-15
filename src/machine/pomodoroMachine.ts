import { createMachine, assign } from "xstate";
import { ticker } from "./utils";
import type {
  PomodoroMachineContext,
  PomodoroMachineEvent,
  PomodoroMachineState,
} from "./type";
import { turnOnNotificationSound } from "../utils/audio/notificationSound";

const pomodoroMachine = createMachine<
  PomodoroMachineContext,
  PomodoroMachineEvent,
  PomodoroMachineState
>({
  id: "pomodoro",
  initial: "run",
  predictableActionArguments: true,
  context: {
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
    workCount: 0,
    intervalTimer: 0.1,
    elapsed: 0,
  },
  states: {
    run: {
      initial: "focus",
      id: "run",
      states: {
        focus: {
          id: "focus",
          initial: "idle",
          states: {
            idle: { on: { START_TIMER: "runTimer" } },
            runTimer: {
              invoke: {
                src: ticker,
              },
              after: {
                FOCUS_TIME: [
                  {
                    target: "#shortBreak",
                    actions: [
                      "incrementWorkCount",
                      "resetElapsed",
                      "runNotificationSound",
                    ],
                    cond: "shouldTakeShortBreak",
                  },
                  {
                    target: "#longBreak",
                    cond: "shouldTakeLongBreak",
                    actions: ["resetElapsed", "runNotificationSound"],
                  },
                ],
              },
            },
          },
        },
        shortBreak: {
          id: "shortBreak",
          initial: "idle",
          states: {
            idle: {
              on: {
                START_TIMER: "runTimer",
              },
            },
            runTimer: {
              invoke: {
                src: ticker,
              },
              after: {
                SHORT_BREAK: {
                  target: "#focus.idle",
                  actions: ["resetElapsed", "runNotificationSound"],
                },
              },
            },
          },
        },
        longBreak: {
          id: "longBreak",
          initial: "idle",
          states: {
            idle: {
              on: {
                START_TIMER: "runTimer",
              },
            },
            runTimer: {
              invoke: {
                src: ticker,
              },
              after: {
                LONG_BREAK: {
                  target: "#focus.idle",
                  actions: [
                    "resetWorkCount",
                    "resetElapsed",
                    "runNotificationSound",
                  ],
                },
              },
            },
          },
        },
        hist: {
          type: "history",
          history: "deep",
        },
      },
      on: {
        PAUSE: {
          target: "#paused",
        },
        TICK: {
          actions: "startTimer",
        },
      },
    },
    paused: {
      id: "paused",
      on: {
        RESUME: {
          target: "#run.hist",
        },
        RESET: {
          target: "#run",
          actions: ["resetWorkCount", "resetElapsed"],
        },
      },
    },
  },
  on: {
    UPDATE_FOCUS_TIME: {
      actions: "updateFocusTime",
    },
    UPDATE_SHORT_BREAK_TIME: {
      actions: "updateShortBreakTime",
    },
    UPDATE_LONG_BREAK_TIME: {
      actions: "updateLongBreakTime",
    },
    UPDATE_LONG_BREAK_INTERVAL: {
      actions: "updateLongBreakInterval",
    },
  },
}).withConfig({
  actions: {
    startTimer: assign({
      elapsed: (ctx) => ctx.elapsed + ctx.intervalTimer,
    }),
    incrementWorkCount: assign((context) => ({
      workCount: context.workCount + 1,
    })),
    resetWorkCount: assign({ workCount: 0 }),
    updateFocusTime: assign({
      focusTime: (ctx, event) =>
        event.type === "UPDATE_FOCUS_TIME" ? event.focusTime : ctx.focusTime,
    }),
    updateShortBreakTime: assign({
      shortBreakTime: (ctx, event) =>
        event.type === "UPDATE_SHORT_BREAK_TIME"
          ? event.shortBreakTime
          : ctx.shortBreakTime,
    }),
    updateLongBreakTime: assign({
      longBreakTime: (ctx, event) =>
        event.type === "UPDATE_LONG_BREAK_TIME"
          ? event.longBreakTime
          : ctx.longBreakTime,
    }),
    updateLongBreakInterval: assign({
      longBreakInterval: (ctx, event) =>
        event.type === "UPDATE_LONG_BREAK_INTERVAL"
          ? event.longBreakInterval
          : ctx.longBreakInterval,
    }),
    resetElapsed: assign({ elapsed: 0 }),
    runNotificationSound: () => {
      turnOnNotificationSound();
    },
  },
  delays: {
    FOCUS_TIME: (context) => context.focusTime * 60 * 1000,
    SHORT_BREAK: (context) => context.shortBreakTime * 60 * 1000,
    LONG_BREAK: (context) => context.longBreakTime * 60 * 1000,
  },
  guards: {
    shouldTakeShortBreak: (ctx) => ctx.workCount < ctx.longBreakInterval,
    shouldTakeLongBreak: (ctx) => ctx.workCount === ctx.longBreakInterval,
  },
});

export { pomodoroMachine };
