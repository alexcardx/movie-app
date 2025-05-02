import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import SelectDropDown from "react-select";
import { SearchIcon, CloseIcon, IconButton } from "@chakra-ui/icons";
import { selectDropDownStyles } from "../constants";
import {
  Box,
  Flex,
  Select,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputRightElement,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

const Filters = ({ countries, genres, categoryOptions, initialCategory }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGenresId, setselectedGenresId] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});
  const [forceEmptyFilters, setForceEmptyFilters] = useState(false);
  const [hideFilters, setHideFilters] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  const alwaysShowFilters = useBreakpointValue({ base: false, xl: true });

  const onSearch = (params = {}) => {
    const rawParams = {
      page: 1,
      sort_by: params.sort_by,
      primary_release_year: params.primary_release_year,
      first_air_date_year: params.first_air_date_year,
      with_genres:
        !params.with_genres || params.with_genres.length === 0
          ? null
          : params.with_genres.sort().join(),
      with_origin_country: params.with_origin_country,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(rawParams).filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    if (!forceEmptyFilters) {
      const isEmptyFilters =
        Object.keys(filteredParams).filter((key) => key !== "page").length ===
          1 &&
        (currentFilters.sort_by ? currentFilters.sort_by : initialCategory) ===
          params.sort_by;
      if (isEmptyFilters) return;
    }

    const isSameFilters = Object.entries(filteredParams).every(
      ([key, value]) => currentFilters[key] === value
    );

    if (isSameFilters) return;

    setSearchParams({ ...filteredParams });

    setForceEmptyFilters(false);
  };

  const onReset = () => {
    setSelectedCountry(null);
    setselectedGenresId([]);
    setSelectedGenre([]);
    setReleaseYear("");
    setForceEmptyFilters(true);
  };

  useEffect(() => {
    setCurrentFilters(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  return (
    <Box pos={"relative"} mb={{ base: 5, xl: 0 }}>
      {!alwaysShowFilters && (
        <IconButton
          icon={<FiFilter />}
          aria-label="Toggle filters"
          onClick={() => setHideFilters((prev) => !prev)}
          variant="outline"
          colorScheme="white"
          mb={4}
          size="sm"
          position={"absolute"}
          zIndex={30}
          top={-6}
          left={0}
        />
      )}
      <Collapse
        in={alwaysShowFilters || hideFilters}
        animateOpacity
        style={{ overflow: "visible" }}
      >
        <Box p={4} borderRadius="md">
          <Flex
            alignItems={"center"}
            gap={"6"}
            my="6"
            justifyContent={"center"}
            position={"relative"}
            zIndex={30}
            flexWrap={"wrap"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Select
              w={"200px"}
              value={selectedCategory}
              _hover={{
                borderColor: "#A0AEC0",
              }}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              sx={{
                option: {
                  backgroundColor: "#000",
                  color: "white",
                },
              }}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Box w="300px">
              <SelectDropDown
                placeholder="Choose a country"
                options={countries}
                value={selectedCountry}
                onChange={(option) => {
                  if (option === null) {
                    setForceEmptyFilters(true);
                  }
                  setSelectedCountry(option);
                }}
                isClearable
                isSearchable
                noOptionsMessage={() => (
                  <Text
                    color="gray.400"
                    fontSize="sm"
                    textAlign="center"
                    py={2}
                  >
                    🚫 Nothing found
                  </Text>
                )}
                styles={selectDropDownStyles}
              />
            </Box>
            <Box w="300px">
              <SelectDropDown
                placeholder="Choose genres"
                options={genres}
                value={selectedGenre}
                onChange={(option) => {
                  setselectedGenresId(() => option.map((item) => item.value));
                  setSelectedGenre(option);
                  if (option.length === 0) {
                    setForceEmptyFilters(true);
                  }
                }}
                isClearable
                isSearchable
                isMulti
                styles={selectDropDownStyles}
                noOptionsMessage={() => (
                  <Text
                    color="gray.200"
                    fontSize="sm"
                    textAlign="center"
                    py={2}
                  >
                    🚫 Nothing found
                  </Text>
                )}
              />
            </Box>
            <Box w="200px">
              <NumberInput
                min={1900}
                max={new Date().getFullYear()}
                value={releaseYear}
                onChange={(value) => setReleaseYear(value)}
                clampValueOnBlur={true}
                focusBorderColor="gray.500"
              >
                <InputGroup>
                  <NumberInputField
                    bg="#000"
                    color="#fff"
                    borderColor="rgba(255, 255, 255, 0.16)"
                    _focus={{
                      borderColor: "#A0AEC0",
                      boxShadow: "0 0 0 1px #A0AEC0",
                    }}
                    _hover={{
                      borderColor: "#A0AEC0",
                    }}
                    _placeholder={{ color: "#737679" }}
                    placeholder="Choose a year"
                    borderRadius="0.375rem"
                    px="3"
                    minH={"42px"}
                  />
                  {releaseYear && (
                    <InputRightElement>
                      <IconButton
                        aria-label="Clear year"
                        icon={<CloseIcon boxSize={2.5} />}
                        size="xs"
                        variant="ghost"
                        colorScheme="gray"
                        onClick={() => {
                          setReleaseYear("");
                          setForceEmptyFilters(true);
                        }}
                        mr={10}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
                <NumberInputStepper>
                  <NumberIncrementStepper color="#A0AEC0" />
                  <NumberDecrementStepper color="#A0AEC0" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Flex gap={"4"} alignItems={"center"}>
              <Button
                bg="transparent"
                border="1px solid rgba(255, 255, 255, 0.16)"
                color="white"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#A0AEC0",
                }}
                _active={{
                  transform: "scale(0.90)",
                }}
                borderRadius="50%"
                w="42px"
                h="42px"
                p={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.2)"
                onClick={onReset}
              >
                <CloseIcon w="20px" h="20px" />
              </Button>
              <Button
                bg="transparent"
                border="1px solid rgba(255, 255, 255, 0.16)"
                color="white"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#A0AEC0",
                }}
                _active={{
                  transform: "scale(0.90)",
                }}
                borderRadius="50%"
                w="42px"
                h="42px"
                p={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.2)"
                onClick={() => {
                  onSearch({
                    sort_by: selectedCategory,
                    [type === "movies"
                      ? "primary_release_year"
                      : "first_air_date_year"]: releaseYear,
                    with_genres: selectedGenresId,
                    with_origin_country: selectedCountry?.value,
                  });
                }}
              >
                <SearchIcon w="20px" h="20px" />
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Filters;
