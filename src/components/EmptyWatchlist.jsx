import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router";

const EmptyWatchlist = ({ heading, text }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={5}
      py={8}
      px={4}
    >
      <Heading as="h3" size="lg" mt={4} color="gray.600">
        {heading}
      </Heading>
      <Text mt={2} color="gray.500">
        {text}
      </Text>
      <Link to="/search">
        <Button mt={4} colorScheme="teal" variant="solid">
          Browse Movies & Shows
        </Button>
      </Link>
    </Box>
  );
};

export default EmptyWatchlist;
