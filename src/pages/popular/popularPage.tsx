import React, { useEffect, useState } from 'react';

import { fetchPopular } from '../../api/homeAPI';
import { IPoster } from '../../interfaces/poster.interface';
import { IGenres } from '../../interfaces/genres.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';
import Genres from '../../components/genres/genres';
import SelectYear from '../../components/selectYear/selectYear';
import { useSearchParams } from 'react-router-dom';

const PopularPage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [genre, setGenre] = useState<IGenres>({ id: 0, name: 'All' });
  const [selectedYear, setSelectedYear] = useState('2023');

  const [queryParams, setQueryParams] = useSearchParams();

  const handleGenre = (toggleGenre: IGenres) => {
    setGenre(toggleGenre);
    setQueryParams({
      genre: toggleGenre.name.toLocaleLowerCase().trim(),
      id: toggleGenre.id.toString(),
      year: selectedYear,
    });
  };

  useEffect(() => {
    const id = queryParams.get('id') ?? '';
    const genre = queryParams.get('genre') ?? '';

    if (id.length > 0 && genre.length > 0) {
      setGenre({ id: Number(id), name: genre });
    }

    setSelectedYear(queryParams.get('year') ?? '2023');
  }, [queryParams]);

  const handleSelect = (selectedYear: string) => {
    setSelectedYear(selectedYear);
    setQueryParams({
      genre: genre.name.toLocaleLowerCase().trim(),
      id: genre.id.toString(),
      year: selectedYear,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data =
          genre.name !== 'All'
            ? await fetchPopular(selectedYear, null, genre.id)
            : await fetchPopular(selectedYear, null, null);
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [genre, selectedYear]);

  return (
    <>
      <div className="title__head">
        <MovieTitle title={`Popular In ${selectedYear}`} />
        <SelectYear handleSelect={handleSelect} selectedYear={selectedYear} />
      </div>
      <Genres handleGenre={handleGenre} genre={genre} />
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      {data.length > 0 && stateData === 'fulfilled' && <Movie data={data} />}
    </>
  );
};

export default PopularPage;
