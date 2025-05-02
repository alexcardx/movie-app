import { Container, Grid, Skeleton, Heading } from "@chakra-ui/react";
import Error from "../components/Error";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import NoResults from "../components/NoResults";
import { useContentFetch } from "../hooks/useContentFetch";
import useFiltersListsFetch from "../hooks/useFiltersListsFetch";
import { initialMovieFilters } from "../constants";
import { fetchMovies } from "../services/api";
import { movieCategoryOptions } from "../constants";
import { Link } from "react-router";

const Movies = () => {
  const {
    content: movies,
    loadingContent,
    fetchContentError,
    totalPages,
    refetchContent,
  } = useContentFetch(initialMovieFilters, fetchMovies);

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
          Discover movies
        </Heading>
        <Filters
          countries={countries}
          genres={genres}
          categoryOptions={movieCategoryOptions}
          initialCategory={initialMovieFilters.sort_by}
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
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card item={movie} />
              </Link>
            ))}
          </Grid>
        )}
      {!loadingContent &&
        !loadingFiltersLists &&
        !fetchContentError &&
        !filtersListsError &&
        movies.length === 0 && <NoResults />}
      <Pagination totalPages={totalPages} />
    </Container>
  );
};

export default Movies;
