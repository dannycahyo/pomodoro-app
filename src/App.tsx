import { useState } from "react";
import { Container } from "@chakra-ui/react";
import Setting from "./components/Setting";
import Home from "./components/Home";
import BottomMenu from "./components/BottomMenu";

function App() {
  const [route, setRoute] = useState<"home" | "setting">("home");

  return (
    <Container justifyContent="center" centerContent minH="100vh">
      {route === "home" && <Home />}

      {route === "setting" && <Setting />}

      <BottomMenu route={route} onRouteChange={(route) => setRoute(route)} />
    </Container>
  );
}

export default App;
