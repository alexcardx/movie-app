import { Flex, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Flex
      justify="center"
      align="center"
      height="85vh"
      direction="column"
      gap={4}
    >
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text fontSize="lg" fontWeight={"bold"} color="gray.400">
        Loading...
      </Text>
    </Flex>
  );
};

export default LoadingSpinner;
