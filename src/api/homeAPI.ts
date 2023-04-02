import axios from 'axios';

const API_KEY = 'cda39dcbab0c3cf1fb9f37d48e4a7bf4';
axios.defaults.baseURL = `https://api.themoviedb.org/3`;

export const fetchTrending = async (limit?: number) => {
  const response = await axios.get(`/trending/movie/week?&api_key=${API_KEY}`);
  if (limit) response.data.results.length = limit;

  return response.data.results;
};

export const fetchPopular = async (limit?: number) => {
  const response = await axios.get(
    `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=2023`
  );

  if (limit) response.data.results.length = limit;
  return response.data.results;
};

export const fetchPremiereSoon = async (limit?: number) => {
  const response = await axios.get(`/movie/now_playing?api_key=${API_KEY}`);

  if (limit) response.data.results.length = limit;
  return response.data.results;
};
