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
  Input,
} from "@chakra-ui/react";
import { BsPencil, BsPlay } from "react-icons/bs";

const Home = () => {
  const [task, setTask] = useState({
    isEditing: false,
    value: "",
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((task) => ({
      ...task,
      value: e.target.value,
    }));
  };

  const handleEditTask = () => {
    setTask((task) => ({
      ...task,
      isEditing: !task.isEditing,
    }));
  };

  return (
    <Container centerContent minH="70vh">
      <Center>
        <VStack>
          <Heading size="lg" color="#83A5F7" pb="6">
            Pomodoro Timer
          </Heading>
          {task.isEditing ? (
            <Input
              color="white"
              value={task.value}
              onChange={handleTaskChange}
              onBlur={handleEditTask}
            />
          ) : (
            <>
              <Tag
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                py="2"
                px="4"
              >
                <TagLabel>
                  {task.value === "" ? "What's your task!" : task.value}
                </TagLabel>
                <TagRightIcon
                  _hover={{ cursor: "pointer" }}
                  as={BsPencil}
                  onClick={handleEditTask}
                />
              </Tag>
            </>
          )}
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
  );
};

export default Home;
