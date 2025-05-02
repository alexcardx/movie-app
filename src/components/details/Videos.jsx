import { Heading, Flex, Text, Box } from "@chakra-ui/react";

const Videos = ({ videos }) => {
  const lastTrailer = videos.filter((video) => video.type === "Trailer")[0];

  const promotionVideos = videos
    .filter((video) => video != lastTrailer)
    .slice(0, 5);

  return (
    <>
      {videos.length === 0 ? (
        <Heading
          as="h2"
          textTransform="uppercase"
          fontSize="xl"
          mt="10"
          mb="5"
          color="gray.200"
        >
          No videos available
        </Heading>
      ) : (
        <>
          <Heading
            as="h2"
            textTransform="uppercase"
            fontSize="xl"
            mt="10"
            mb="5"
            color="gray.200"
          >
            Videos
          </Heading>
          <Box
            width={"100%"}
            height={{ base: "300px", md: "400px", lg: "500px", xl: "600px" }}
          >
            <iframe
              width={"100%"}
              height={"100%"}
              src={`https://www.youtube.com/embed/${
                lastTrailer
                  ? lastTrailer.key
                  : promotionVideos[promotionVideos.length - 1].key
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Box>
          <Flex mt="5" mb="10" overflowX="auto" overflowY="hidden" gap={4}>
            {lastTrailer
              ? promotionVideos.map((video) => (
                  <Box
                    key={video.key}
                    minWidth={{ base: "180px", md: "250px", lg: "400px" }}
                    height={{ base: "100px", md: "150px", lg: "250px" }}
                  >
                    <iframe
                      width={"100%"}
                      height={"100%"}
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </Box>
                ))
              : promotionVideos.map((video, i) => {
                  if (i === promotionVideos.length - 1) {
                    return null;
                  } else {
                    return (
                      <Box
                        key={video.key}
                        minWidth={{ base: "180px", md: "250px", lg: "400px" }}
                        height={{ base: "100px", md: "150px", lg: "250px" }}
                      >
                        <iframe
                          width={"100%"}
                          height={"100%"}
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </Box>
                    );
                  }
                })}
          </Flex>
        </>
      )}
    </>
  );
};

export default Videos;
