import {
  Container,
  Grid,
  Skeleton,
  Heading,
  Input,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import Error from "../components/Error";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import NoResults from "../components/NoResults";
import { fetchSearch } from "../services/api";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [search, setSearch] = useState("");
  const [incorrectSearch, setInCorrectSearch] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const query = searchParams.get("query") || "";

  const handleSearch = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError(false);
    try {
      const data = await fetchSearch(query, page);
      setResults(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setSearch("");
      setInCorrectSearch((prev) => !prev);
      setTimeout(() => setInCorrectSearch((prev) => !prev), 800);
      return;
    }
    setSearchParams({ query: search, page: 1 });
    setSearch("");
    document.activeElement.blur();
  };

  const onReset = () => {
    setSearch("");
  };

  const onRetry = () => {
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Container maxW={"container.xl"} mb={results.length < 20 ? 10 : ""}>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          mb={10}
        >
          <Heading
            as={"h2"}
            fontSize={"x-large"}
            color={"gray.400"}
            textTransform={"uppercase"}
            textAlign={"center"}
            mb={6}
          >
            Search
          </Heading>
          <Box
            display={"flex"}
            flexDir={{ base: "column", sm: "row" }}
            gap={5}
            minW={"80%"}
          >
            <Input
              placeholder={
                incorrectSearch
                  ? "Enter something!"
                  : "Search for movies and TV series"
              }
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              bg="black"
              color="white"
              border="1px solid rgba(255, 255, 255, 0.16)"
              _placeholder={{
                color: "#737679",
              }}
              _hover={{ borderColor: "#A0AEC0" }}
              _focus={{
                borderColor: "#A0AEC0",
                boxShadow: "0 0 0 1px #A0AEC0",
                "&::placeholder": {
                  color: incorrectSearch ? "#737679" : "transparent",
                },
              }}
              transition="all 0.1s ease-in-out"
              className={incorrectSearch ? "animation-shake" : ""}
              borderRadius="md"
              fontSize={"md"}
              px="4"
              py="2"
            />
            <Flex
              gap={"4"}
              justifyContent={{ base: "center", sm: "stretch" }}
              alignItems={"center"}
            >
              <Button
                bg="transparent"
                border="1px solid rgba(255, 255, 255, 0.18)"
                color="white"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#A0AEC0",
                }}
                _active={{
                  transform: "scale(0.90)",
                }}
                borderRadius="50%"
                w="42px"
                h="42px"
                p={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.2)"
                onClick={onReset}
                onMouseDown={(e) => e.preventDefault()}
              >
                <CloseIcon w="20px" h="20px" />
              </Button>
              <Button
                bg="transparent"
                border="1px solid rgba(255, 255, 255, 0.18)"
                color="white"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#A0AEC0",
                }}
                _active={{
                  transform: "scale(0.90)",
                }}
                borderRadius="50%"
                w="42px"
                h="42px"
                p={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.2)"
                onClick={handleSubmit}
              >
                <SearchIcon w="20px" h="20px" />
              </Button>
            </Flex>
          </Box>
        </Box>
      </form>
      {loading && (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton
              key={i}
              height={{
                base: "550px",
                md: "250px",
                lg: "280px",
                xl: "355px",
              }}
            />
          ))}
        </Grid>
      )}
      {!loading && error && (
        <Error
          message="Something went wrong"
          onRetry={() => {
            onRetry();
          }}
        />
      )}
      {!loading && !error && (
        <>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={"4"}
          >
            {results.map((item) => (
              <Link key={item.id} to={`/${item.media_type}/${item.id}`}>
                <Card item={item} />
              </Link>
            ))}
          </Grid>
        </>
      )}
      {!loading && !error && results.length > 19 && (
        <Pagination totalPages={totalPages} />
      )}
      {!loading && !error && results.length === 0 && query !== "" && (
        <NoResults />
      )}
    </Container>
  );
};

export default Search;
