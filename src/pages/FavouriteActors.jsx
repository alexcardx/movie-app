import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";
import { Link, useSearchParams } from "react-router";
import { MdMovie } from "react-icons/md";
import { imagePath } from "../services/api";
import EmptyWatchlist from "../components/EmptyWatchlist";
import { FaTimes } from "react-icons/fa";
import Pagination from "../components/Pagination";

const FavouriteActors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchParams] = useSearchParams();

  const { getActors, removeActorFromDB } = useFirestore();
  const { user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentPage = Number(searchParams.get("page"));
  const itemsPerPage = 20;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRemoveActorFromFavourites = async () => {
    if (!selectedItem) return;
    await removeActorFromDB(user.uid, selectedItem.id.toString()).then(() =>
      setData((data) => data.filter((item) => item.id !== selectedItem.id))
    );
    onClose();
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getActors(user.uid)
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [getActors, user.uid]);

  return (
    <Container maxW={"container.xl"} mb={data.length < 20 ? 10 : ""}>
      <Flex justify="center" align="center" mb={8} position="relative">
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          textTransform="uppercase"
          textAlign="center"
          color="gray.300"
          letterSpacing="widest"
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            bottom: -2,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "2px",
            bg: "teal.400",
          }}
        >
          Favourite Actors
        </Heading>
        <Icon as={MdMovie} color="#999999" boxSize={10} ml={2} />
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
          onRetry={() => {
            setLoading(true);
            setError(null);
            getActors(user.uid)
              .then((data) => setData(data))
              .catch((err) => setError(err))
              .finally(() => setLoading(false));
          }}
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
          {currentItems.map((item) => (
            <Box
              key={item.id}
              position="relative"
              _hover={{
                ".remove-button": {
                  opacity: 1,
                },
              }}
            >
              <IconButton
                className="remove-button"
                position="absolute"
                top="2"
                right="2"
                colorScheme="red"
                icon={<FaTimes />}
                onClick={() => {
                  setSelectedItem(item);
                  onOpen();
                }}
                size="xs"
                zIndex="20"
                opacity={{ base: 1, xl: 0 }}
                _hover={{
                  opacity: 1,
                  bg: "red.500",
                  color: "white",
                }}
                borderRadius="full"
              />
              <Link to={`/actor/${item.id}`}>
                <Box
                  position={"relative"}
                  transform={"scale(1)"}
                  _hover={{
                    xl: {
                      transform: { base: "scale(1)", md: "scale(1.08)" },
                      transition: "transform 0.2s ease-in-out",
                      zIndex: "10",
                      "& .overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Image
                    src={`${imagePath}/${item.profile_path}`}
                    alt={item.name}
                    height={"100%"}
                  />
                  <Flex
                    justifyContent={"center"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    className="overlay"
                    position={"absolute"}
                    p={{ base: "1", lg: "initial" }}
                    gap={{ xl: "1" }}
                    bottom={"0"}
                    left="0"
                    w={"100%"}
                    h={"20%"}
                    bg="rgba(0,0,0,0.8)"
                    opacity={{ base: 1, xl: 0 }}
                    transition={"opacity 0.3s ease-in-out"}
                  >
                    <Text
                      textAlign={"center"}
                      fontSize={{ base: "25px", md: "md", xl: "lg" }}
                    >
                      {item.name}
                    </Text>
                  </Flex>
                </Box>
              </Link>
            </Box>
          ))}
        </Grid>
      )}
      {!loading && !error && data.length > 19 && (
        <Pagination totalPages={totalPages} />
      )}
      {!loading && !error && data.length === 0 && (
        <EmptyWatchlist
          heading={"Your favorites list is empty."}
          text={
            "You haven’t added any actors to your favorites yet. Browse movies and TV shows to discover actors you love and add them to your watchlist."
          }
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#121212" color="white" boxShadow="lg">
          <ModalHeader textAlign={"center"} mt={2}>
            Confirm Deletion
          </ModalHeader>
          <ModalCloseButton
            _hover={{ bg: "red.600", color: "white" }}
            _focus={{ boxShadow: "none" }}
          />
          <ModalBody>
            Are you sure you want to remove this actor from your favourites?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              _hover={{ bg: "red.600" }}
              onClick={handleRemoveActorFromFavourites}
              ml={3}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default FavouriteActors;
