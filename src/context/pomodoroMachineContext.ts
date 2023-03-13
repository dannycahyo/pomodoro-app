import { createActorContext } from "@xstate/react";
import { pomodoroMachine } from "../machine/pomodoroMachine";

const PomodoroMachineContext = createActorContext(pomodoroMachine);

export { PomodoroMachineContext };
