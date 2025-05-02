import { Box, Container } from "@chakra-ui/react";
import Description from "./Description";
import Cast from "./Cast";
import Videos from "./Videos";

const DetailsLayout = ({
  details,
  cast,
  videos,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  isInWatchlist,
}) => {
  return (
    <Box>
      <Container maxW="container.xl" pb="10">
        <Description
          details={details}
          handleAddToWatchList={handleAddToWatchList}
          handleRemoveFromWatchList={handleRemoveFromWatchList}
          isInWatchlist={isInWatchlist}
        />
        <Cast cast={cast} />
        <Videos videos={videos} />
      </Container>
    </Box>
  );
};

export default DetailsLayout;
