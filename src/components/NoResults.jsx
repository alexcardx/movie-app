import { Box, Text, Icon } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const NoResults = () => {
  return (
    <Box
      textAlign="center"
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 6 }}
      bg="#1A202C"
      borderRadius="md"
      border="1px solid rgba(255, 255, 255, 0.1)"
      w="full"
      mx="auto"
      mt={4}
    >
      <Icon
        as={FiSearch}
        boxSize={{ base: 6, md: 8 }}
        color="gray.400"
        mb={2}
      />
      <Text
        fontSize={{ base: "md", md: "xl" }}
        color="gray.200"
        fontWeight="semibold"
      >
        Nothing found
      </Text>
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
        Try adjusting your filters and search again.
      </Text>
    </Box>
  );
};

export default NoResults;
