import React, { useEffect, useState } from 'react';

import { IPoster } from '../../interfaces/poster.interface';
import { fetchTrending } from '../../api/homeAPI';

import Movie from '../../components/movie/movie';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import MovieTitle from '../../components/movie/movieTitle';

const MoviesPage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchTrending();
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);
  return (
    <>
      <MovieTitle title="Movie" />
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      <Movie data={data} />
    </>
  );
};

export default MoviesPage;
