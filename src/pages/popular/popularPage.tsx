import React, { useEffect, useState } from 'react';

import { IPoster } from '../../interfaces/poster.interface';
import { fetchPopular } from '../../api/homeAPI';
import { IGenres } from '../../interfaces/genres.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';
import Genres from '../../components/genres/genres';
import SelectYear from '../../components/selectYear/selectYear';

const PopularPage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [genre, setGenre] = useState<IGenres>({ id: 0, name: 'All' });
  const [selectedYear, setSelectedYear] = useState('2023');

  const handleSelect = (selectedYear: string) => {
    setSelectedYear(selectedYear);
  };

  const handleGenre = (toggleGenre: IGenres) => {
    setGenre(toggleGenre);
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
      <div className="popular__head">
        <MovieTitle title="Popular" />
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