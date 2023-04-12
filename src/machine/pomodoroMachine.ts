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
  /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BbVFUCdUGIBVABQBEBBAFQFEB9AMQHkBhQgZVsoEkBZagbQAMAXUQpUsAJYAXSagB2YkAA9EADgBMggHQBOAGwBGQYIAsGtad1r9AVgA0IAJ6INu3drW3dAZkuHbQ0MAdlt9AF9wxzRMbDwiMio6NgAJRgAlSloAIXTqcgBpTl4BESU0KVkFJVUEYN9tQX0NW2C-Wx9TQ1MHZ1dBHz0mlqMTYLUfYIiokBisXAISChpaABlGADkAcRy8wuK+IVEkWYkZOUUT2vrg7X19Lo1DXVtBLTNHFwRjW5efQwsglePl0z0MkWiGHm8SWSTWmx2uXyRS4Gxo6QAauRVkdymcqpdQNd6toLIYfBpgt0LD01J9EACIadYgttDgAK7yfDEcjsUrHcSVC41Bn6DzBAYA2xqMw+WwaFr0hCmCXaf4tQSWEzkim2JlzOKoNmc-DcZgFXEnCrnapXBnau6CQwPTV2TRTJXUtRq0JO2zeCbjfVQw3G+TaABmqAAxuzYNpJBAADZgfBsSjkTIHajpS2Cm2ElSIQLe0zDGVef4PYJK9weEKGNSaVoUjQU4MsvBhyMxuNhyiSdBgHD4ZSwaQAQ2kYG0E4j05wAAomKwONw+ABKfAG1kc8NR2PxvcDoc4POnIW2onqNSGbRS4ZTNQGLy1uzaYLmRvNzpNNQd6EjT3HtD37Qdh1HccpxnOcF2XFh2GzLcdy7YCDz7Y9wLPQwBQvAsRQQJs7wfZonxfXovmCNo9H0NQqTlNsfFonwANDYDYAAC1waRshwMAJwAawTZNU3TTMsnXHNz2tAkCPJDp70EXRTAeYwZQBfRPSBQZ9CpIifHVeVglY3dOW0TjuN4-ihMw09IMnadZ3nYdF1SDIsiRQpkJDUzwwsnAeL4wSwNPaT8WFO0EBBUxtDLZoxVMSZ9AMnpPWdfR7z08YlNCFSTNQsykwUKArOCxMUzTDMs0k3MyitcKryLb4-DvXQnncUxnxa50lUsb1dMbUwhvJIENHyoDCuK0qbM5E8ILHByYOcpd1m2XZkW8zsJvDIr5BKoKZvkOazzq-NZMi6LYuGBKkpSijEH0Ew1QBKw63MMsxpmFCjWQCc40gfA8jYQhDlOvDzuvb4xQ-SUWhlRL5UVPpmqee8NRCXQTEez9xu0X7-ogQHqDYahKDCy9C1qAJxVh6VZUR+7mqpO50YpAxuhsSIZnkLA4DxLa8QpgiAFpDCVPwNE8KUAS0AJdI6XG90F-CLr8K74uU27OkZwJJdvDVJheXShsVsz0PgeqhYumx1Y0G6pju3qmzuKk2p6KjbE64yvp8gr917eNyrAZWIaaxKYriu3NYd7Xa3cF3G3qMJzFCFifa27tzZC4cQ4iyHaMlswxUT0JWm8Wspky78ATeFUQlNvyuIC6bc8aqmFWIpSeijjROoCWtEqrywuibNw08hDP2KbwLrOElNW8phko8U5T5TFXvb0Z4xPaH8ZWx8Mx-3TwDu38mfgtsnPLZVyGAmdD9XmMLQD-MSYtIPhO6PcR7H9MBvtF2vtayC85K9w8G1Z4EwVSaBlIzNo3oGxNl-JYNwf9j5sUmntaac9g7X1Du3XQvx2pQPGICRmlh6x6SGl0A+8p-6AOwZfHAIDIoBB6NoMIdsKS3maAqGsyNmyfzLAMAy8o0ETxPsBDikhxwsMhn4Dwkd7bJVjsjckWgfSvCLoIVOuN8awEgHIsO-CvgqnrHRV4wQwFOi8HqLmQA */
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
    nextStateAfterSkip: "",
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
              always: [
                {
                  cond: "shouldSkipToShortBreakState",
                  target: "#shortBreak",
                  actions: ["incrementWorkCount", "resetElapsed"],
                },
                {
                  cond: "shouldSkipToLongBreakState",
                  target: "#longBreak",
                  actions: "resetElapsed",
                },
              ],
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
              always: {
                cond: "shouldSkipToFocusState",
                target: "#focus.idle",
                actions: "resetElapsed",
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
          entry: "resetWorkCount",
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
              always: {
                cond: "shouldSkipToFocusState",
                target: "#focus.idle",
                actions: "resetElapsed",
              },
              after: {
                LONG_BREAK: {
                  target: "#focus.idle",
                  actions: ["resetElapsed", "runNotificationSound"],
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
        SKIP: {
          target: "#run.hist",
          actions: "assignNextStateAfterSkipValue",
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
    assignNextStateAfterSkipValue: assign({
      nextStateAfterSkip: (ctx, event) =>
        event.type === "SKIP"
          ? event.nextStateAfterSkip
          : ctx.nextStateAfterSkip,
    }),
  },
  delays: {
    FOCUS_TIME: (context) => context.focusTime * 60 * 1000,
    SHORT_BREAK: (context) => context.shortBreakTime * 60 * 1000,
    LONG_BREAK: (context) => context.longBreakTime * 60 * 1000,
  },
  guards: {
    shouldTakeShortBreak: (ctx) => ctx.workCount < ctx.longBreakInterval,
    shouldTakeLongBreak: (ctx) => ctx.workCount === ctx.longBreakInterval,
    shouldSkipToShortBreakState: (ctx) =>
      ctx.nextStateAfterSkip === "shortBreak",
    shouldSkipToLongBreakState: (ctx) => ctx.nextStateAfterSkip === "longBreak",
    shouldSkipToFocusState: (ctx) => ctx.nextStateAfterSkip === "focus",
  },
});

export { pomodoroMachine };
