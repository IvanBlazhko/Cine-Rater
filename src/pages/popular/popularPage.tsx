import React, { useEffect, useState } from 'react';

import { IPoster } from '../../interfaces/poster.interface';
import { fetchPopular } from '../../api/homeAPI';
import { IGenres } from '../../interfaces/genres.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';
import Genres from '../../components/genres/genres';

const PopularPage: React.FC = () => {
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
            ? await fetchPopular(null, genre.id)
            : await fetchPopular();
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [genre]);
  return (
    <>
      <MovieTitle title="Popular" />
      <Genres handleGenre={handleGenre} genre={genre} />
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      {data.length > 0 && stateData === 'fulfilled' && <Movie data={data} />}
    </>
  );
};

export default PopularPage;
