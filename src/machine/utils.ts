import { Sender } from "xstate";
import type { PomodoroMachineContext, PomodoroMachineEvent } from "./type";

const ticker =
  (ctx: PomodoroMachineContext) => (send: Sender<PomodoroMachineEvent>) => {
    const interval = setInterval(() => {
      send({ type: "TICK" });
    }, ctx.intervalTimer * 1000);

    return () => clearInterval(interval);
  };

export { ticker };
