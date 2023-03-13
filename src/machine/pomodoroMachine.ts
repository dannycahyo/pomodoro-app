import { createMachine, assign, Sender } from "xstate";

type PomodoroMachineContext = {
  focusTime: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  workCount: number;
  elapsed: number;
  intervalTimer: number;
};

type PomodoroMachineEvent =
  | { type: "TICK" }
  | { type: "START_SHORT_BREAK" }
  | { type: "START_TIMER" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET" };

const ticker =
  (ctx: PomodoroMachineContext) => (send: Sender<PomodoroMachineEvent>) => {
    const interval = setInterval(() => {
      send("TICK");
    }, ctx.intervalTimer * 1000);

    return () => clearInterval(interval);
  };

const pomodoroMachine = createMachine<
  PomodoroMachineContext,
  PomodoroMachineEvent
>({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BbVFUCdUDocBXAO3wDNUBjI2fASwgBswBiAZQBUBBAJU4D6nAJIBZAKK8A2gAYAuohSpY9AC71UJRSAAeiAEz6AjPhlmzAVgAc+gCyHbVowBoQAT0QB2b-k9P9AJxOAQBsMrYAzBEAvtGuaJjYeISkFNS0KSSc9OhgOKwACtwAquzisgpIIGgq6praeghGFjL6+PoRtrYyVlYhniH6fa4eCJ62IfgBMiERRhGe4X5RsfEYWLgExGSUNHTb2bn5IgDCANIV2jVqGlpVjRFBvhZ+Rv0hji8hI17j+C9ORYhCwWAKfVbVdZJLapXYZA45PKsHSwVQAQ1UYHwaPImJwAAoAGIAeROpSEYnEAEpWAkNsltmk9plDnlLlVrnU7qBGtYIr4jFZPBZbItbBYIiEAj8ELYjCZPPpgWCrAEIvphfoIXToZkmfDSKz8ij0Zjsbi8kTSeSRBIaTrNnq4ftDYicFIjJUlLVbg1EKD+Z5BcLReEJVKZQFjPhurMzEYOgEvtqoY7GbAABa4VQAIRwYDRAGsGMw2Fw+IJbZJ2d6bvV7ohpjJfJ05TJFZ5QhMZSCAqZFQEgzYLMYZAEU4k06lM9m8wXiwijqxThd5FdlHXubpEEZ21YY1HjJ142CZeLm-oZHNxlYFmCVnFIZOGdOszhc-miyy3YUSmUa5CPr1jyO4tG0HRdD0fQDEM3zuP6vQxjMEQyPKsxKq0E70jCZAzu+c5fouSImhiWI4ni+LsAAEsS-ACDmvDiNwZz2qmL64W+H7zt+RwAZyvoNggg4yoE-KisCgLNPK4xYbqjJMJoUAEcWjAsBwPB0VW0hrhyG5cn6TRjrY-zNCEITDi8l4uPBhkTKYSpGAMkRmbuFiyVOZAKSQSmfgurpLkUpTlDptb6YJzStO0rZQe8sEyrudlWKCLSDlK95WO57H4F5PncURxzCOcfF6QJIFNBq4GeJ0ixRp2tihJGCz4KZcxRK08oiplOHZYpyk8cRqKkeaFEADLEgAcgA4vRjHMaxz7dTlfX5cVQFbo0wk2dJ-JhEmrQWIMdhdfgyBorQkCsIx7DFBIq2bgZI7xRMFj4LeoJJeKASCrYx2nedECXeIZScHdYVlY9NlOAeAQw70RhdOZV6xI+JBYHA64Leua0GQAtJ4Mo4yEx3bFj92CXKIkyC9qUHbMsxWPYbmPg6WXOqTYPbggqoyuZnj9k4IIoRMVVE8zbHdc6JYsOzpWc-M+M2d4+5DAmQRGKE4QPmsC1OukLpZG6MvAZzEQM-gHzIXKSpgoEMpCi9EoJoq5m7reova9hep4VxRZG+tXjmS2kS9JKUpRDKkptIscygo4ZnmT9Ys6+mnF9apYB+wZTiTFVwdu2HEQ9qC-wDkO+gjru45J57Kezr5-U4Jn4UzMZCwtChMEamqRcmC1Y5qmZh7E6kS2+U3ZWhG0FimeKqoTL0Fh2-V5sHYEnYtAzMzD55vX1+n49y6hzbTwds9guZSXxeEkwjiEjkfKHrnbz13nLf5eQH40CbWM1q+9IEZhOhWCvqbZqY5p7ikcGORyz8Mz0FRJ-Rs+h4pzGMtYMIw4ZjTFvL9M6sBICIKaIMVu0wzIgk7L0IMMpxh81jGvN4nYnLI2iEAA */
  id: "pomodoro",
  initial: "run",
  predictableActionArguments: true,
  context: {
    focusTime: 25,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    interval: 4,
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
                    actions: "incrementWorkCount",
                    cond: "shouldTakeShortBreak",
                  },
                  { target: "#longBreak", cond: "shouldTakeLongBreak" },
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
                SHORT_BREAK: { target: "#focus.idle" },
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
                  actions: "resetWorkCount",
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
          target: "#run.focus",
          actions: "resetWorkCount",
        },
      },
    },
  },
}).withConfig({
  actions: {
    startTimer: assign({
      elapsed: (ctx) => ctx.elapsed + ctx.intervalTimer,
    }),
    resumeTimer: assign({
      elapsed: (context) => {
        const remaining = context.focusTime - context.elapsed / 1000;
        return remaining;
      },
      intervalTimer: (context) => {
        const remaining = context.focusTime - context.elapsed / 1000;
        return remaining >= 1 ? 1 : remaining;
      },
    }),
    incrementWorkCount: assign((context) => ({
      workCount: context.workCount + 1,
    })),
    resetWorkCount: assign({ workCount: 0 }),
  },
  delays: {
    FOCUS_TIME: (context) => context.focusTime * 1000,
    SHORT_BREAK: (context) => context.shortBreak * 1000,
    LONG_BREAK: (context) => context.longBreak * 1000,
  },
  guards: {
    shouldTakeShortBreak: (ctx) => ctx.workCount < ctx.interval,
    shouldTakeLongBreak: (ctx) => ctx.workCount === ctx.interval,
  },
});

export { pomodoroMachine };
