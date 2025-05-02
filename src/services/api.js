import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

// Home page
export const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`
  );
  return data.results;
};

// MOVIES & TV SHOWS - Details

export const fetchDetails = async (type, id) => {
  const { data } = await axios.get(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
  );
  return data;
};

// MOVIES & TW Shows - Credits

export const fetchCredits = async (type, id) => {
  const { data } = await axios.get(
    `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`
  );
  return data;
};

// MOVIES & TW Shows - Videos

export const fetchVideos = async (type, id) => {
  const { data } = await axios.get(
    `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
  );
  return data.results;
};

// ACTOR PAGE

export const fetchActor = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}`
  );
  return data;
};

export const fetchActorCredits = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}`
  );
  return data.cast;
};

export const fetchActorSocials = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}/person/${id}/external_ids?api_key=${API_KEY}`
  );
  return data;
};

// MOVIE PAGE

export const fetchMovies = async (params = {}) => {
  const query = new URLSearchParams(params);
  const { data } = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&${query}`
  );
  return data;
};

// FILTERS DATA

export const fetchCountriesList = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/configuration/countries?api_key=${API_KEY}`
  );

  return data;
};

export const fetchGenresList = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );

  return data;
};

// SHOW PAGE

export const fetchShows = async (params = {}) => {
  const query = new URLSearchParams(params);
  const { data } = await axios.get(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&${query}`
  );
  return data;
};

// SEARCH PAGE

export const fetchSearch = async (query, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return data;
};
