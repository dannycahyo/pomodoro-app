import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Tag,
  TagLabel,
  TagRightIcon,
  Center,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  HStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";
import {
  BsPencil,
  BsPlay,
  BsFillGearFill,
  BsFillHouseFill,
} from "react-icons/bs";

function App() {
  const [route, setRoute] = useState<"home" | "setting">("home");

  const homeBottomMenuStyle =
    route === "home" ? { colorScheme: "blue" } : { colorScheme: "whiteAlpha" };

  const settingBottomMenuStyle =
    route === "setting"
      ? { colorScheme: "blue" }
      : { colorScheme: "whiteAlpha" };

  return (
    <Container justifyContent="center" centerContent minH="100vh">
      {route === "home" && (
        <Container centerContent minH="70vh">
          <Center>
            <VStack>
              <Heading size="lg" color="#83A5F7" pb="6">
                Pomodoro Timer
              </Heading>
              <Tag
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                py="2"
                px="4"
              >
                <TagLabel>Task: Write an article</TagLabel>
                <TagRightIcon as={BsPencil} />
              </Tag>
            </VStack>
          </Center>

          <Box pt="12">
            <CircularProgress value={30} size="180px" thickness="12px">
              <CircularProgressLabel paddingTop="12px">
                <Heading size="lg" color="#83A5F7" pb="6">
                  05:42
                </Heading>
              </CircularProgressLabel>
            </CircularProgress>
          </Box>

          <Center pt="12">
            <VStack gap={8}>
              <Heading size="md" color="#83A5F7">
                Short Break!
              </Heading>
              <IconButton
                colorScheme="blue"
                aria-label="Play Button"
                size="lg"
                icon={<BsPlay />}
                fontSize="2xl"
              />
            </VStack>
          </Center>
        </Container>
      )}

      {route === "setting" && (
        <Container centerContent minH="70vh">
          <Heading size="lg" color="#83A5F7" pb="10">
            Add New Timer
          </Heading>

          <VStack gap={2}>
            <Select
              placeholder="Focuse Time"
              color="whiteAlpha.800"
              bg="gray.700"
              borderColor="gray.700"
              borderRadius="full"
              minW={200}
            >
              <option value={25}>25 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={50}>50 Minutes</option>
            </Select>
            <Select
              placeholder="Short Break"
              color="whiteAlpha.800"
              bg="gray.700"
              borderColor="gray.700"
              borderRadius="full"
              minW={200}
            >
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
            </Select>
            <Select
              placeholder="Long Break"
              color="whiteAlpha.800"
              bg="gray.700"
              borderColor="gray.700"
              borderRadius="full"
              minW={200}
            >
              <option value={10}>10 Minutes</option>
              <option value={15}>20 Minutes</option>
              <option value={20}>30 Minutes</option>
            </Select>
            <Box pl="2">
              <Text color="whiteAlpha.800" mb="2">
                Intervals
              </Text>
              <NumberInput
                placeholder="Interval"
                color="whiteAlpha.800"
                defaultValue={2}
                min={1}
                max={10}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color="whiteAlpha.800" />
                  <NumberDecrementStepper color="whiteAlpha.800" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </VStack>
        </Container>
      )}

      <Box pt="24">
        <HStack spacing="24px">
          <IconButton
            {...homeBottomMenuStyle}
            variant="ghost"
            aria-label="Home Button"
            size="lg"
            fontSize="3xl"
            icon={<BsFillHouseFill />}
            onClick={() => setRoute("home")}
          />
          <IconButton
            {...settingBottomMenuStyle}
            variant="ghost"
            aria-label="Setting Button"
            size="lg"
            fontSize="3xl"
            icon={<BsFillGearFill />}
            onClick={() => setRoute("setting")}
          />
        </HStack>
      </Box>
    </Container>
  );
}

export default App;
