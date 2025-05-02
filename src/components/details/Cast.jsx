import { imagePath } from "../../services/api";
import { Flex, Box, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router";

const Cast = ({ cast }) => {
  return (
    <>
      <Heading
        as={"h2"}
        textTransform={"uppercase"}
        fontSize={"xl"}
        mt={"10"}
        color={"gray.200"}
      >
        {cast.length === 0 ? "No cast found" : "Cast"}
      </Heading>
      {cast.length !== 0 && (
        <Flex
          mt={"5"}
          mb={"10"}
          overflowX={"auto"}
          overflowY={"hidden"}
          gap={"5"}
        >
          {cast.map((actor) => (
            <Link key={actor.id} to={`/actor/${actor.id}`}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                minW={"200px"}
                minH={"400px"}
                pb={2}
                h={"100%"}
              >
                <Image
                  src={`${imagePath}/${actor.profile_path}`}
                  borderTopRadius={"10px"}
                  maxH={"300px"}
                />
                <Box
                  pt={4}
                  px={2}
                  pb={2}
                  bg={"rgba(29, 28, 28, 0.5)"}
                  border={"1px solid rgba(255, 255, 255, 0.16)"}
                  borderTop={"none"}
                  borderBottomRadius={"10px"}
                  flexGrow={1}
                >
                  <Text fontWeight={"bold"} fontSize={"md"}>
                    {actor.name}
                  </Text>
                  <Text
                    mt={2}
                    fontSize={"sm"}
                    textTransform={"initial"}
                    color={"gray.400"}
                  >
                    {actor.character}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Cast;
