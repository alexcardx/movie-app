import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router";

const Pagination = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const currentParams = Object.fromEntries(searchParams.entries());

  return (
    <Flex gap={"2"} alignItems={"center"}>
      <Flex gap={"2"} maxW={"250px"} my={"10"}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          isDisabled={page === 1}
          variant="outline"
          colorScheme="gray"
          onClick={() => setSearchParams({ ...currentParams, page: page - 1 })}
        >
          Prev
        </Button>
        <Button
          leftIcon={<ChevronRightIcon />}
          isDisabled={page === totalPages}
          variant="outline"
          colorScheme="gray"
          onClick={() => setSearchParams({ ...currentParams, page: page + 1 })}
        >
          Next
        </Button>
      </Flex>
      <Flex gap={"1"}>
        <Text fontSize="md" color="gray.500" fontWeight="medium" ml={2}>
          Page {page} of {totalPages}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Pagination;
