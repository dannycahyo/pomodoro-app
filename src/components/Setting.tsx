import {
  Box,
  Container,
  Heading,
  VStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";

const Setting = () => {
  return (
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
            defaultValue={4}
            min={2}
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
  );
};

export default Setting;
