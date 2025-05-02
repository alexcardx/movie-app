import { Box, Text, Icon, Button } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 6 }}
      bg="#1A202C"
      borderRadius="md"
      border="1px solid rgba(255, 255, 255, 0.1)"
      w="full"
      mx="auto"
      mt={4}
      minH={"50vh"}
    >
      <Icon
        as={FiAlertTriangle}
        boxSize={{ base: 6, md: 8 }}
        color="orange.400"
        mb={2}
      />
      <Text
        fontSize={{ base: "md", md: "xl" }}
        color="gray.200"
        fontWeight="semibold"
      >
        Page Not Found
      </Text>
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <Button
        as={Link}
        to="/"
        colorScheme="teal"
        variant="solid"
        size="md"
        mt={2}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
