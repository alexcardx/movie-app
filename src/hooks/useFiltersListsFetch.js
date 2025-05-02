import { useState, useEffect, useCallback } from "react";
import { fetchCountriesList, fetchGenresList } from "../services/api";
import { getFlagEmoji } from "../utils/helpers";

const useFiltersListsFetch = () => {
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingFiltersLists, setLoadingFiltersLists] = useState(true);
  const [filtersListsError, setfiltersListsError] = useState(false);

  const fetchFiltersLists = useCallback(async () => {
    setLoadingFiltersLists(true);
    setfiltersListsError(false);
    try {
      const [countries, genres] = await Promise.all([
        fetchCountriesList(),
        fetchGenresList(),
      ]);
      setCountries(
        countries.map((country) => {
          return {
            label: `${getFlagEmoji(country.iso_3166_1)} ${
              country.english_name
            }`,
            value: country.iso_3166_1,
          };
        })
      );
      setGenres(
        genres.genres.map((genre) => {
          return {
            label: genre.name,
            value: genre.id,
          };
        })
      );
    } catch (err) {
      setfiltersListsError(err);
    } finally {
      setLoadingFiltersLists(false);
    }
  }, []);

  useEffect(() => {
    fetchFiltersLists();
  }, [fetchFiltersLists]);

  return {
    countries,
    genres,
    loadingFiltersLists,
    filtersListsError,
    refetchFiltersLists: fetchFiltersLists,
  };
};

export default useFiltersListsFetch;
