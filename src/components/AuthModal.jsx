import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  Text,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { signInWithGoogle, signInWithEmail, registerWithEmail } =
    useContext(AuthContext);

  const toast = useToast();

  const validate = () => {
    const errs = {};
    if (!email.includes("@")) errs.email = "Invalid email address";
    if (password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAuth = async () => {
    if (!validate()) return;
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        toast({ status: "success", title: "Signed in" });
      } else {
        await registerWithEmail(email, password);
        toast({
          status: "info",
          title: "Verification email sent",
          description:
            "Please check your inbox and confirm your email address.",
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      const message = getReadableError(error.code);
      toast({ status: "error", title: message });
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast({ status: "success", title: "Signed in with Google" });
      onClose();
    } catch (error) {
      const message = getReadableError(error.code);
      toast({ status: "error", title: message });
    }
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const getReadableError = (code) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "The email address is incorrect.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({});
      setIsLogin(true);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
      <ModalContent bg="black" color="white" p={6} borderRadius="xl">
        <ModalHeader textAlign="center" fontSize="2xl">
          {isLogin ? "Sign In" : "Create Your Account"}
        </ModalHeader>
        <ModalCloseButton _hover={{ bg: "red.600" }} />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter your email"
                bg={"black.200"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => clearError("email")}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                bg={"black.200"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => clearError("password")}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              w="100%"
              onClick={handleAuth}
              color={"white"}
              bg="red.500"
              _hover={{ bg: "red" }}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <Box
              fontSize="sm"
              color="gray.400"
              onClick={() => setIsLogin(!isLogin)}
              cursor="pointer"
            >
              {isLogin ? (
                <Text>
                  Don’t have an account?{" "}
                  <Text
                    as="span"
                    color="red.500"
                    cursor="pointer"
                    onClick={() => {
                      setEmail("");
                      setPassword("");
                      setErrors({});
                      setIsLogin(false);
                    }}
                  >
                    Sign up
                  </Text>
                </Text>
              ) : (
                <Text>
                  Already have an account?{" "}
                  <Text
                    as="span"
                    color="red.500"
                    cursor="pointer"
                    onClick={() => {
                      setEmail("");
                      setPassword("");
                      setErrors({});
                      setIsLogin(true);
                    }}
                  >
                    Sign in
                  </Text>
                </Text>
              )}
            </Box>
            <Flex align="center" gap={2} w={"100%"}>
              <Box flex="1" h="0.5px" bg="gray.800" />
              <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
                or
              </Text>
              <Box flex="1" h="0.5px" bg="gray.800" />
            </Flex>
            <Button
              leftIcon={<FcGoogle />}
              width="100%"
              bg="green.500"
              color="white"
              _hover={{ bg: "green.400" }}
              onClick={handleGoogle}
            >
              Continue with Google
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
