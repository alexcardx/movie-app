import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { useParams } from "react-router";
import {
  fetchActor,
  fetchActorCredits,
  fetchActorSocials,
  imagePath,
} from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import {
  Container,
  Heading,
  Flex,
  Box,
  Text,
  Collapse,
  Button,
  useToast,
} from "@chakra-ui/react";
import { formatBirthday } from "../utils/helpers";
import { CheckCircleIcon, SmallAddIcon } from "@chakra-ui/icons";
import SocialLinks from "../components/actor/SocialLinks";
import ActorWorks from "../components/actor/ActorWorks";
import SkeletonImg from "../components/SkeletonImg";
import { AuthContext } from "../context/AuthContext";
import useFirestore from "../hooks/useFirestore";

const startingHeight = 200;

const Actor = () => {
  const [actorBio, setActorBio] = useState({});
  const [actorCredits, setActorCredits] = useState({});
  const [socials, setSocials] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isInFavourites, setIsInFavourites] = useState(null);

  const contentRef = useRef(null);

  const { id } = useParams();

  const { saveActorToDB, removeActorFromDB, checkIfInFavourites } =
    useFirestore();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const fetchData = useCallback(() => {
    const handleFetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [actorBio, actorCredits, socials] = await Promise.all([
          fetchActor(id),
          fetchActorCredits(id),
          fetchActorSocials(id),
        ]);
        setActorBio(actorBio);
        setActorCredits(actorCredits);
        setSocials(socials);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    handleFetchData();
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddToFavourites = async () => {
    const actorData = {
      name: actorBio.name,
      profile_path: actorBio.profile_path,
      id: id,
    };

    await saveActorToDB(user.uid, id, actorData);
    const isInWatchlist = await checkIfInFavourites(user.uid, id);
    setIsInFavourites(isInWatchlist);
  };

  const handleRemovefromFavourites = async () => {
    await removeActorFromDB(user.uid, id);
    const isInWatchlist = await checkIfInFavourites(user.uid, id);
    setIsInFavourites(isInWatchlist);
  };

  useEffect(() => {
    try {
      const checkFavourites = async () => {
        if (!user) return;
        const result = await checkIfInFavourites(user.uid, id);
        setIsInFavourites(result);
      };
      checkFavourites();
    } catch (err) {
      setError(err);
    }
  }, [checkIfInFavourites, user, id]);

  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current;
      if (el && el.scrollHeight > startingHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [actorBio]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && error && (
        <Error message="Something went wrong" onRetry={() => fetchData()} />
      )}
      {!loading && !error && (
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={{ base: "center", md: "stretch" }}
            gap={6}
            direction={{ base: "column", md: "row" }}
          >
            <SkeletonImg
              src={`${imagePath}/${actorBio.profile_path}`}
              alt={actorBio.name}
              width="300px"
              height="450px"
            />
            <Box
              flex={1}
              bg="whiteAlpha.100"
              borderRadius="lg"
              p={4}
              boxShadow="md"
            >
              <Heading
                as="h2"
                size="xl"
                mb={2}
                color={"gray.300"}
                fontWeight="bold"
                letterSpacing="wide"
              >
                {actorBio.name}
              </Heading>
              <Text mb={1}>
                <strong>Birthday:</strong>{" "}
                {!actorBio.birthday
                  ? "Unknown"
                  : formatBirthday(actorBio.birthday, actorBio.deathday)}
              </Text>
              <Box
                display={"flex"}
                flexDir={{ base: "column", lg: "row" }}
                alignItems={"baseline"}
                mb={{ base: 5, lg: 0 }}
              >
                <Text mb={4}>
                  <strong>Place of birth:</strong>{" "}
                  {!actorBio.place_of_birth
                    ? "Unknown"
                    : actorBio.place_of_birth}
                </Text>
                {!user && (
                  <Button
                    ml={{ base: 0, lg: 10 }}
                    variant={"outline"}
                    leftIcon={<SmallAddIcon />}
                    onClick={() => {
                      toast({
                        title: "Sign in to add to favourites",
                        status: "error",
                        isClosable: true,
                      });
                    }}
                    _active={{ transform: "scale(0.95)" }}
                    transition="all 0.3s ease"
                  >
                    Add to favourites
                  </Button>
                )}
                {isInFavourites !== null &&
                  (isInFavourites ? (
                    <Button
                      ml={{ base: 0, lg: 10 }}
                      colorScheme="green"
                      variant={"outline"}
                      leftIcon={<CheckCircleIcon />}
                      onClick={handleRemovefromFavourites}
                      _active={{ transform: "scale(0.95)" }}
                      transition="all 0.3s ease"
                    >
                      In Favourites
                    </Button>
                  ) : (
                    <Button
                      ml={{ base: 0, lg: 10 }}
                      variant={"outline"}
                      leftIcon={<SmallAddIcon />}
                      onClick={handleAddToFavourites}
                      _active={{ transform: "scale(0.95)" }}
                      transition="all 0.3s ease"
                    >
                      Add to favourites
                    </Button>
                  ))}
              </Box>
              <Heading
                as="h4"
                size="md"
                mb={2}
                color="gray.300"
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="semibold"
              >
                Biography
              </Heading>
              {!actorBio.biography ? (
                <Text fontStyle="italic" color="gray.500">
                  Biography is not available.
                </Text>
              ) : (
                <>
                  <Collapse ref={contentRef} startingHeight={200} in={showBio}>
                    <Text whiteSpace="pre-wrap">{actorBio.biography}</Text>
                  </Collapse>
                  {isOverflowing && (
                    <Box textAlign="center" mt={4}>
                      <Button
                        onClick={() => setShowBio((prev) => !prev)}
                        colorScheme="blue"
                        variant="outline"
                        size={{ base: "sm", md: "md" }}
                        _active={{
                          transform: "scale(0.95)",
                        }}
                        _hover={{
                          bg: "rgba(144, 205, 244, 0.2)",
                          color: "white",
                        }}
                        transition="all 0.3s ease"
                      >
                        {showBio ? "Hide" : "Read more"}
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Flex>
          {actorCredits.length === 0 ? (
            <Text
              fontStyle="italic"
              color="gray.500"
              bg="whiteAlpha.50"
              p={3}
              borderRadius="md"
              textAlign="center"
            >
              No known works found for this actor.
            </Text>
          ) : (
            <ActorWorks actorCredits={actorCredits} />
          )}
          <SocialLinks socials={socials} />
        </Container>
      )}
    </>
  );
};

export default Actor;
