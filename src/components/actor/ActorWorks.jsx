import { getMostPopularWorks } from "../../utils/helpers";
import { Link } from "react-router";
import { imagePath } from "../../services/api";
import { Heading, Flex, Box, Text, Image } from "@chakra-ui/react";

const ActorWorks = ({ actorCredits }) => {
  return (
    <>
      <Heading
        as={"h4"}
        size="lg"
        mt={4}
        color={"gray.300"}
        fontWeight="bold"
        letterSpacing="wide"
      >
        Known for:{" "}
      </Heading>
      <Flex mt={"5"} mb={"4"} overflowX={"auto"} overflowY={"hidden"} gap={"5"}>
        {getMostPopularWorks(actorCredits).map((work) => (
          <Link key={work.id} to={`/${work.media_type}/${work.id}`}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              minW={"200px"}
              minH={"400px"}
              pb={2}
              h={"100%"}
            >
              <Image
                src={`${imagePath}/${work.poster_path}`}
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
                  {work.name || work.title}
                </Text>
                <Text
                  mt={2}
                  fontSize={"sm"}
                  textTransform={"initial"}
                  color={"gray.400"}
                >
                  {work.character}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default ActorWorks;
