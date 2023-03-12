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
} from "@chakra-ui/react";
import { BsPencil, BsPlay } from "react-icons/bs";

const Home = () => {
  return (
    <Container centerContent minH="70vh">
      <Center>
        <VStack>
          <Heading size="lg" color="#83A5F7" pb="6">
            Pomodoro Timer
          </Heading>
          <Tag size="lg" colorScheme="blue" borderRadius="full" py="2" px="4">
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
  );
};

export default Home;
