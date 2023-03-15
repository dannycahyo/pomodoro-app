import { Box, Select, Text } from "@chakra-ui/react";

import type React from "react";

type SelectOptionProps = {
  label: string;
  time: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: number[];
};

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  time,
  onChange,
  options,
}) => {
  return (
    <Box>
      <Text color="whiteAlpha.800" mb="2">
        {label}
      </Text>
      <Select
        placeholder="Short Break"
        color="whiteAlpha.800"
        bg="gray.700"
        borderColor="gray.700"
        borderRadius="full"
        minW={240}
        value={time}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>{`${option} Minutes`}</option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectOption;
