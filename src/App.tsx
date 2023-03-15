import { useState } from "react";
import { Container } from "@chakra-ui/react";

import Setting from "./components/setting";
import Home from "./components/home";
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
      <BottomMenu
        route={route}
        onRouteChange={(newRoute) => setRoute(newRoute)}
      />
    </Container>
  );
}

export default App;
