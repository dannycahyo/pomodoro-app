import { Box, IconButton, HStack } from "@chakra-ui/react";
import { BsFillGearFill, BsFillHouseFill } from "react-icons/bs";

type BottomMenuProps = {
  route: "home" | "setting";
  onRouteChange: (route: "home" | "setting") => void;
};

const BottomMenu: React.FC<BottomMenuProps> = ({ route, onRouteChange }) => {
  const homeBottomMenuStyle =
    route === "home" ? { colorScheme: "blue" } : { colorScheme: "whiteAlpha" };

  const settingBottomMenuStyle =
    route === "setting"
      ? { colorScheme: "blue" }
      : { colorScheme: "whiteAlpha" };

  return (
    <Box pt="10">
      <HStack spacing="24px">
        <IconButton
          {...homeBottomMenuStyle}
          variant="ghost"
          aria-label="Home Button"
          size="lg"
          fontSize="3xl"
          icon={<BsFillHouseFill />}
          onClick={() => onRouteChange("home")}
        />
        <IconButton
          {...settingBottomMenuStyle}
          variant="ghost"
          aria-label="Setting Button"
          size="lg"
          fontSize="3xl"
          icon={<BsFillGearFill />}
          onClick={() => onRouteChange("setting")}
        />
      </HStack>
    </Box>
  );
};

export default BottomMenu;
