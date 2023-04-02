import React, { useEffect, useState } from 'react';

import { IPoster } from '../../interfaces/poster.interface';
import { fetchPremiereSoon } from '../../api/homeAPI';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';

const PremierePage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchPremiereSoon();
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);
  return (
    <>
      <MovieTitle title="Premiere soon" />
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      <Movie data={data} />
    </>
  );
};

export default PremierePage;
