import React, { useEffect, useState } from 'react';

import { IGenres } from '../../interfaces/genres.interface';
import { IPoster } from '../../interfaces/poster.interface';
import { fetchPremiere } from '../../api/homeAPI';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';
import Genres from '../../components/genres/genres';

const PremierePage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [genre, setGenre] = useState<IGenres>({ id: 0, name: 'All' });

  const handleGenre = (toggleGenre: IGenres) => {
    setGenre(toggleGenre);
  };

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data =
          genre.name !== 'All'
            ? await fetchPremiere(null, genre.id)
            : await fetchPremiere();
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [genre]);
  return (
    <>
      <MovieTitle title="Premiere" />
      <Genres handleGenre={handleGenre} genre={genre} />
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      {data.length > 0 && stateData === 'fulfilled' && <Movie data={data} />}
    </>
  );
};

export default PremierePage;
