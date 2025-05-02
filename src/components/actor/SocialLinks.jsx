import { getSocialLinks } from "../../utils/helpers";
import {
  HStack,
  Tooltip,
  Link,
  IconButton,
  Box,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";

const SocialLinks = ({ socials }) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} mb="5" rowGap={2} columnGap={2}>
      <HStack spacing={2}>
        <Icon as={FaLink} color="gray.400" boxSize={5} />
        <Heading as="h4" size="md" color="gray.300">
          Social Links:{" "}
          {getSocialLinks(socials).length === 0 &&
            "No social media links available"}
        </Heading>
      </HStack>
      <HStack spacing={3} gap={0}>
        {getSocialLinks(socials).map(
          (social) =>
            social.id && (
              <Tooltip key={social.label} label={social.label}>
                <Link href={social.url} isExternal>
                  <IconButton
                    aria-label={social.label}
                    icon={<social.icon />}
                    variant="ghost"
                    colorScheme="blue"
                    size="lg"
                    _hover={{ bg: "whiteAlpha.200" }}
                  />
                </Link>
              </Tooltip>
            )
        )}
      </HStack>
    </Box>
  );
};

export default SocialLinks;
