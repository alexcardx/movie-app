import { Text, Button, VStack, Icon } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const Error = ({ message, onRetry }) => (
  <VStack
    spacing={4}
    py={10}
    mt={{ base: "150px", sm: "250px" }}
    color="red.500"
    textAlign="center"
    width={"100%"}
  >
    <Icon as={WarningIcon} w={8} h={8} />
    <Text
      fontSize={{
        base: "xl",
        md: "x-large",
        xl: "xx-large",
      }}
      fontWeight="bold"
    >
      {message}
    </Text>
    <Button
      fontSize={{ base: "md", md: "large" }}
      colorScheme="red"
      variant="solid"
      onClick={onRetry}
    >
      Try again
    </Button>
  </VStack>
);

export default Error;
