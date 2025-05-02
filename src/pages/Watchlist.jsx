import { useContext, useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../components/Card";
import { Link, useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import EpmtyWatchlist from "../components/EmptyWatchlist";
import { MdStar } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const Watchlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchParams] = useSearchParams();

  const { getWatchlist, removeItemFromDB } = useFirestore();
  const { user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemoveFromWatchlist = async () => {
    if (!selectedItem) return;
    await removeItemFromDB(user.uid, selectedItem.id.toString()).then(() =>
      setData((data) => data.filter((item) => item.id !== selectedItem.id))
    );
    onClose();
  };

  const currentPage = Number(searchParams.get("page"));
  const itemsPerPage = 20;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    getWatchlist(user.uid)
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [getWatchlist, user.uid]);

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
          My Watchlist
        </Heading>
        <Icon as={MdStar} color="yellow" boxSize={10} ml={2} />
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
            getWatchlist(user.uid)
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
              <Link to={`/${item.media_type}/${item.id}`}>
                <Card item={item} />
              </Link>
            </Box>
          ))}
        </Grid>
      )}
      {!loading && !error && data.length > 19 && (
        <Pagination totalPages={totalPages} />
      )}
      {!loading && !error && data.length === 0 && (
        <EpmtyWatchlist
          heading={"Watchlist is Empty"}
          text={
            "Looks like you haven't added anything to your watchlist yet. Start by adding some movies or shows!"
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
            Are you sure you want to remove this item from your watchlist?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              _hover={{ bg: "red.600" }}
              onClick={handleRemoveFromWatchlist}
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

export default Watchlist;
