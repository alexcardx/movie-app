import {
  Container,
  Flex,
  Grid,
  Heading,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import Card from "../components/Card";
import Error from "../components/Error";
import { Link } from "react-router";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [timeWindow, setTimeWindow] = useState("day");

  const handleFetchTrending = useCallback(() => {
    setLoading(true);
    setError(false);
    fetchTrending(timeWindow)
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  useEffect(() => {
    handleFetchTrending();
  }, [handleFetchTrending]);

  return (
    <Container maxW={"container.xl"} mb={10}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading
          as={"h2"}
          fontSize={{ base: "md", md: "large" }}
          textTransform={"uppercase"}
        >
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"1"}
          border={"1px solid teal"}
          borderRadius={"20px"}
          fontSize={{ base: "md", md: "large", xl: "md" }}
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.800" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.800" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This week
          </Box>
        </Flex>
      </Flex>
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
              height={{ base: "550px", md: "250px", lg: "280px", xl: "355px" }}
            />
          ))}
        </Grid>
      )}
      {!loading && error && (
        <Error
          message="Something went wrong"
          onRetry={() => handleFetchTrending()}
        />
      )}
      {!loading && !error && (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {data.map((item) => (
            <Link key={item.id} to={`/${item.media_type}/${item.id}`}>
              <Card item={item} />
            </Link>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
