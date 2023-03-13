import { useState } from "react";
import { Container } from "@chakra-ui/react";

import Setting from "./components/Setting";
import Home from "./components/Home";
import BottomMenu from "./components/BottomMenu";

import { PomodoroMachineContext } from "./context/pomodoroMachineContext";

function App() {
  const [route, setRoute] = useState<"home" | "setting">("home");

  return (
    <Container justifyContent="center" centerContent minH="100vh">
      <PomodoroMachineContext.Provider>
        {route === "home" && <Home />}
        {route === "setting" && <Setting />}
      </PomodoroMachineContext.Provider>
      <BottomMenu route={route} onRouteChange={(route) => setRoute(route)} />
    </Container>
  );
}

export default App;
