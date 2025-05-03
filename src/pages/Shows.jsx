import { Container, Grid, Skeleton, Heading } from "@chakra-ui/react";
import Error from "../components/Error";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import NoResults from "../components/NoResults";
import { useContentFetch } from "../hooks/useContentFetch";
import useFiltersListsFetch from "../hooks/useFiltersListsFetch";
import { initialShowsFilters } from "../constants";
import { fetchShows } from "../services/api";
import { showsCategoryOptions } from "../constants";
import { Link } from "react-router";

const Shows = () => {
  const {
    content: shows,
    loadingContent,
    fetchContentError,
    totalPages,
    refetchContent,
  } = useContentFetch(initialShowsFilters, fetchShows);

  const {
    countries,
    genres,
    loadingFiltersLists,
    filtersListsError,
    refetchFiltersLists,
  } = useFiltersListsFetch();

  return (
    <Container maxW={"container.xl"}>
      <>
        <Heading
          as={"h4"}
          fontSize={"xl"}
          color={"gray.400"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          Discover shows
        </Heading>
        <Filters
          countries={countries}
          genres={genres}
          categoryOptions={showsCategoryOptions}
          initialCategory={initialShowsFilters.sort_by}
        />
      </>
      {(loadingContent || loadingFiltersLists) && (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton
              key={i}
              height={{
                base: "550px",
                md: "250px",
                lg: "280px",
                xl: "355px",
              }}
            />
          ))}
        </Grid>
      )}
      {!loadingContent &&
        !loadingFiltersLists &&
        fetchContentError &&
        filtersListsError && (
          <Error
            message="Something went wrong"
            onRetry={() => {
              refetchContent();
              refetchFiltersLists();
            }}
          />
        )}
      {!loadingContent &&
        !loadingFiltersLists &&
        !fetchContentError &&
        !filtersListsError && (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={"4"}
          >
            {shows.map((show) => (
              <Link key={show.id} to={`/tv/${show.id}`}>
                <Card item={show} />
              </Link>
            ))}
          </Grid>
        )}
      {!loadingContent &&
        !loadingFiltersLists &&
        !fetchContentError &&
        !filtersListsError &&
        shows.length === 0 && <NoResults />}
      {!loadingContent &&
        !loadingFiltersLists &&
        !fetchContentError &&
        !filtersListsError &&
        shows.length > 19 && <Pagination totalPages={totalPages} />}
    </Container>
  );
};

export default Shows;
