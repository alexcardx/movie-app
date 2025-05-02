import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";

const Card = ({ item }) => {
  return (
    <Box
      position={"relative"}
      transform={"scale(1)"}
      _hover={{
        transform: { base: "scale(1)", md: "scale(1.08)" },
        transition: "transform 0.2s ease-in-out",
        zIndex: "10",
        "& .overlay": {
          opacity: 1,
        },
      }}
    >
      <Image
        src={`${imagePath}/${item.poster_path}`}
        alt={item.title || item.name}
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
        h={"33%"}
        bg="rgba(0,0,0,0.9)"
        opacity={"0"}
        transition={"opacity 0.3s ease-in-out"}
      >
        <Text
          textAlign={"center"}
          fontSize={{ base: "25px", md: "md", xl: "lg" }}
        >
          {item.title || item.name}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{ base: "md", md: "xs", xl: "small" }}
          color={"green.200"}
          mt={{ base: "1", md: 0 }}
        >
          {new Date(item.release_date || item.first_air_date).getFullYear() ||
            new Date().getFullYear()}
        </Text>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={{ base: "xl", md: "xs", xl: "small" }}
          gap={{ base: "2", md: "1" }}
          mt={{ base: "3", md: "0" }}
        >
          <StarIcon />
          {item.vote_average ? (
            <Text>{item.vote_average?.toFixed(1)}</Text>
          ) : (
            "N/A"
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Card;
