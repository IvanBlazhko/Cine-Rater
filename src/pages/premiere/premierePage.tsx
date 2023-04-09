import React, { useEffect, useState } from 'react';

import { IGenres } from '../../interfaces/genres.interface';
import { IPoster } from '../../interfaces/poster.interface';
import { fetchPremiere } from '../../api/homeAPI';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';
import Genres from '../../components/genres/genres';
import { useSearchParams } from 'react-router-dom';

const PremierePage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [genre, setGenre] = useState<IGenres>({ id: 0, name: 'All' });
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenre = (toggleGenre: IGenres) => {
    setGenre(toggleGenre);
    setSearchParams({
      genre: toggleGenre.name.toLocaleLowerCase().trim(),
      id: toggleGenre.id.toString(),
    });
  };

  useEffect(() => {
    const id = searchParams.get('id') ?? '';
    const genre = searchParams.get('genre') ?? '';

    if (id.length > 0 && genre.length > 0) {
      setGenre({ id: Number(id), name: genre });
    }
  }, [searchParams]);

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
