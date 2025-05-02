import { ratingColor, ratingToPercentage } from "../../utils/helpers";
import { imagePath, imagePathOriginal } from "../../services/api";
import { useParams } from "react-router";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Badge,
  useToast,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import SkeletonImg from "../SkeletonImg";
import { BsCollectionPlay } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Description = ({
  details,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  isInWatchlist,
}) => {
  const { type } = useParams();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const releaseDate =
    type === "tv"
      ? new Date(details.first_air_date)
      : new Date(details.release_date);

  return (
    <Box
      background={`linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${imagePathOriginal}/${details.backdrop_path})`}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      w={"100%"}
      h={{ base: "auto", md: "500px" }}
      py={"2"}
      display={"flex"}
      alignItems={"center"}
    >
      <Container maxW={"container.xl"}>
        <Flex
          alignItems={"center"}
          gap="10"
          flexDirection={{ base: "column", md: "row" }}
          pos={"relative"}
        >
          <SkeletonImg
            src={`${imagePath}/${details.poster_path}`}
            alt="poster"
            borderRadius={"sm"}
            width="300px"
            height="450px"
          />
          <Box>
            <Heading fontSize={"3xl"}>
              {details.title || details.name}
              <Text as={"span"} fontWeight={"normal"} color={"gray.400"} ml={4}>
                {releaseDate.getFullYear()}
              </Text>
            </Heading>
            <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
              <Flex alignItems={"center"} mt={2} gap={1}>
                <CalendarIcon mr={2} color={"gray.400"} />
                <Text fontSize={"sm"}>
                  {releaseDate.toLocaleDateString("en-US")}
                </Text>
                <Flex ml={2} gap={1}>
                  {details.production_countries.map((country) => (
                    <Badge key={country.name}>{country["iso_3166_1"]}</Badge>
                  ))}
                </Flex>
                <Box сolor={"gray.400"} mr="2" ml={5}>
                  {type === "movie" ? (
                    <Box display={"flex"} alignItems={"center"}>
                      <TimeIcon color={"gray.200"} mr={2} />
                      <Text>{`${Math.trunc(details.runtime / 60)}h ${
                        details.runtime % 60
                      }m`}</Text>
                    </Box>
                  ) : (
                    <Box display={"flex"} alignItems={"center"}>
                      <BsCollectionPlay size={20} />
                      <Text
                        ml={2}
                      >{`Seasons: ${details.number_of_seasons}`}</Text>
                    </Box>
                  )}
                </Box>
              </Flex>
            </Flex>
            <Flex alignItems={"center"} ap={"4"}>
              <CircularProgress
                value={ratingToPercentage(details.vote_average)}
                bg={"gray.800"}
                borderRadius={"full"}
                size={"70px"}
                color={ratingColor(details.vote_average)}
                thickness={"6px"}
              >
                <CircularProgressLabel fontSize={"lg"}>
                  {ratingToPercentage(details.vote_average)}
                  <Box as="span" ml={"2px"} fontSize={"15px"}>
                    %
                  </Box>
                </CircularProgressLabel>
              </CircularProgress>
              <Text display={{ base: "none", md: "initial" }} ml={3}>
                User Score
              </Text>
              {!user && (
                <Button
                  ml={5}
                  variant={"outline"}
                  leftIcon={<SmallAddIcon />}
                  onClick={() => {
                    toast({
                      title: "Sign in to add to watchlist",
                      status: "error",
                      isClosable: true,
                    });
                  }}
                  _active={{ transform: "scale(0.95)" }}
                  transition="all 0.3s ease"
                >
                  Add to watchlist
                </Button>
              )}
              {isInWatchlist !== null &&
                (isInWatchlist ? (
                  <Button
                    ml={5}
                    colorScheme="green"
                    variant={"outline"}
                    leftIcon={<CheckCircleIcon />}
                    onClick={handleRemoveFromWatchList}
                    _active={{ transform: "scale(0.95)" }}
                    transition="all 0.3s ease"
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button
                    ml={5}
                    variant={"outline"}
                    leftIcon={<SmallAddIcon />}
                    onClick={handleAddToWatchList}
                    _active={{ transform: "scale(0.95)" }}
                    transition="all 0.3s ease"
                  >
                    Add to watchlist
                  </Button>
                ))}
            </Flex>
            <Text
              color={"gray.400"}
              fontSize={"sm"}
              fontStyle={"italic"}
              my={5}
            >
              {details.tagline}
            </Text>
            <Heading fontSize={"xl"} mb={"3"}>
              Overview
            </Heading>
            <Text fontSize={"md"} mb={"3"}>
              {details.overview}
            </Text>
            <Flex mt={6} gap={2}>
              {details.genres.map((item) => (
                <Badge p={1} key={item.id}>
                  {item.name}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Description;
