import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import AuthModal from "./AuthModal";
import { MdMovie } from "react-icons/md";
import { MdStar } from "react-icons/md";

const Navbar = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isAuthOpen,
    onOpen: onAuthOpen,
    onClose: onAuthClose,
  } = useDisclosure();

  const { user, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <Box py="4" mb="2">
      <Container maxW="container.xl">
        <Flex
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="space-between"
        >
          <Button
            onClick={() => onBack()}
            variant="outline"
            size={{ base: "sm", md: "md" }}
            leftIcon={<ArrowBackIcon />}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.3s ease"
            bg={"#ffffff14"}
          >
            Back
          </Button>
          <Link as={NavLink} _hover={{ textDecoration: "none" }} to="/">
            <Text
              as="h1"
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              NETFLEX
            </Text>
          </Link>
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <Link as={NavLink} to="/search?page=1">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton onClick={onDrawerOpen} icon={<HamburgerIcon />} />
          </Box>
          <Drawer isOpen={isDrawerOpen} placement="top" onClose={onDrawerClose}>
            <DrawerOverlay />
            <DrawerContent bg={"black"} h="100vh">
              <DrawerCloseButton />
              <DrawerHeader>
                {user && (
                  <Flex justify={"center"} alignItems="center" gap="2" mt={20}>
                    <Avatar bg="red.500" size={"sm"} name={user.email} />
                    <Box fontSize={"md"} color={"gray.400"}>
                      {user.displayName || user.email}
                    </Box>
                  </Flex>
                )}
                {!user && (
                  <Flex justify={"center"} alignItems="center" gap="2" mt={20}>
                    <Avatar bg="gray.500" size={"sm"} />
                    <Box fontSize={"lg"} color={"gray.400"}>
                      Unknown user
                    </Box>
                  </Flex>
                )}
              </DrawerHeader>
              <DrawerBody
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap={6}
                  textAlign="center"
                  color="gray.400"
                  onClick={onDrawerClose}
                >
                  <Link
                    as={NavLink}
                    to="/"
                    sx={{
                      "&.active": {
                        color: "red",
                        fontSize: "lg",
                      },
                    }}
                    color={"gray.400"}
                  >
                    Home
                  </Link>
                  <Link
                    as={NavLink}
                    to="/movies?page=1"
                    sx={{
                      "&.active": {
                        color: "red",
                        fontSize: "lg",
                      },
                    }}
                    color={"gray.400"}
                  >
                    Movies
                  </Link>
                  <Link
                    as={NavLink}
                    to="/shows?page=1"
                    sx={{
                      "&.active": {
                        color: "red",
                        fontSize: "lg",
                      },
                    }}
                    color={"gray.400"}
                  >
                    TV Shows
                  </Link>
                  {!user && (
                    <Button
                      leftIcon={<ArrowForwardIcon />}
                      variant="outline"
                      colorScheme="red"
                      borderColor="red.500"
                      color="red.400"
                      _hover={{
                        bg: "red.500",
                        color: "white",
                        borderColor: "red.500",
                      }}
                      size="sm"
                      w="50vw"
                      mt={4}
                      onClick={onAuthOpen}
                    >
                      Sign In
                    </Button>
                  )}
                  {user && (
                    <>
                      <Link
                        as={NavLink}
                        to="/watchlist?page=1"
                        sx={{
                          "&.active": {
                            color: "red",
                            fontSize: "lg",
                          },
                        }}
                        color={"gray.400"}
                      >
                        <Box display={"flex"} alignItems={"center"}>
                          Watchlist{" "}
                          <Icon as={MdStar} color="yellow" boxSize={6} ml={2} />
                        </Box>
                      </Link>
                      <Link
                        as={NavLink}
                        to="/favouriteActors?page=1"
                        sx={{
                          "&.active": {
                            color: "red",
                            fontSize: "lg",
                          },
                        }}
                        color={"gray.400"}
                      >
                        <Box display={"flex"} alignItems={"center"}>
                          Actors{" "}
                          <Icon
                            as={MdMovie}
                            color="#999999"
                            boxSize={6}
                            ml={2}
                          />
                        </Box>
                      </Link>
                      <Button
                        variant={"outline"}
                        colorScheme="red"
                        onClick={logOut}
                        w={"50vw"}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
        <Flex
          justifyContent="space-between"
          display={{ base: "none", md: "flex" }}
        >
          <Link as={NavLink} to="/" _hover={{ textDecoration: "none" }}>
            <Text
              as="h1"
              fontSize={"4xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              NETFLEX
            </Text>
          </Link>
          <Flex gap={"4"} alignItems={"center"}>
            <Link
              as={NavLink}
              to="/"
              sx={{
                "&.active": {
                  color: "red",
                  fontSize: "lg",
                },
              }}
              _hover={{ color: "red" }}
              color={"gray.400"}
            >
              Home
            </Link>
            <Link
              as={NavLink}
              to="/movies?page=1"
              sx={{
                "&.active": {
                  color: "red",
                  fontSize: "lg",
                },
              }}
              _hover={{ color: "red" }}
              color={"gray.400"}
            >
              Movies
            </Link>
            <Link
              as={NavLink}
              to="/shows?page=1"
              sx={{
                "&.active": {
                  color: "red",
                  fontSize: "lg",
                },
              }}
              _hover={{ color: "red" }}
              color={"gray.400"}
            >
              TV shows
            </Link>
            <Link
              as={NavLink}
              to="/search?page=1"
              sx={{
                "&.active": {
                  color: "red",
                  fontSize: "xl",
                },
              }}
              _hover={{ color: "red" }}
              color={"gray.400"}
              fontSize={"lg"}
            >
              <SearchIcon fontSize={"inherit"} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color="white"
                    size="sm"
                    name={user.email}
                  />
                </MenuButton>
                <MenuList
                  bg="rgba(255, 255, 255, 0.05)"
                  backdropFilter="blur(8px)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  py={2}
                  borderRadius="md"
                >
                  <MenuItem
                    bg="transparent"
                    _hover={{ bg: "rgba(255, 255, 255, 0.12)" }}
                    as={NavLink}
                    to="/watchlist?page=1"
                    color="white"
                  >
                    My Watchlist{" "}
                    <Icon as={MdStar} color="yellow" boxSize={4} ml={2} />
                  </MenuItem>
                  <MenuItem
                    bg="transparent"
                    _hover={{ bg: "rgba(255, 255, 255, 0.12)" }}
                    as={NavLink}
                    to="/favouriteActors?page=1"
                    color="white"
                  >
                    Favourite Actors
                    <Icon as={MdMovie} color="#999999" boxSize={4} ml={2} />
                  </MenuItem>
                  <MenuItem
                    bg="transparent"
                    _hover={{ bg: "rgba(255, 255, 255, 0.12)" }}
                    onClick={logOut}
                    color="white"
                  >
                    Sign out
                    <Icon
                      as={ExternalLinkIcon}
                      boxSize={4}
                      ml={2}
                      color="gray.200"
                      variant="ghost"
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.800"}
                as={"button"}
                onClick={onAuthOpen}
              />
            )}
            <AuthModal isOpen={isAuthOpen} onClose={onAuthClose} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
