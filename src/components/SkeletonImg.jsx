import { useState } from "react";
import { Box, Skeleton, Image } from "@chakra-ui/react";

const SkeletonImg = ({
  src,
  alt,
  width = "100%",
  height = "100%",
  borderRadius = "xl",
  boxShadow = "lg",
  objectFit = "cover",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box position="relative" width={width} height={height}>
      <Skeleton
        isLoaded={isLoaded}
        width={width}
        height={height}
        borderRadius={borderRadius}
        startColor="gray.100"
        endColor="gray.300"
      >
        <Image
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          objectFit={objectFit}
          borderRadius={borderRadius}
          boxShadow={boxShadow}
          onLoad={() => setIsLoaded(true)}
        />
      </Skeleton>
    </Box>
  );
};

export default SkeletonImg;
