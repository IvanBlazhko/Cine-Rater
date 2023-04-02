import axios from 'axios';

const API_KEY = 'cda39dcbab0c3cf1fb9f37d48e4a7bf4';

export const fetchMovieItem = async (id: string) => {
  const response = await axios.get(`movie/${id}?api_key=${API_KEY}`);

  return response.data;
};

export const fetchReview = async (id: string) => {
  const response = await axios.get(`movie/${id}/reviews?api_key=${API_KEY}`);

  return response.data.results;
};
