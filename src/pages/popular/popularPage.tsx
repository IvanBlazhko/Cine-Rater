import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { fetchPopular } from '../../api/homeAPI';
import { IPoster } from '../../interfaces/poster.interface';
import { IGenres } from '../../interfaces/genres.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import Movie from '../../components/movie/movie';
import Genres from '../../components/genres/genres';
import SelectYear from '../../components/selectYear/selectYear';
import Paginate from '../../components/paginate/paginate';

const PopularPage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [genre, setGenre] = useState<IGenres>({ id: 0, name: 'All' });
  const [selectedYear, setSelectedYear] = useState('2023');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [queryParams, setQueryParams] = useSearchParams();

  const handlePage = (num: number) => {
    setPage(num);
    setQueryParams({
      genre: genre.name.toLocaleLowerCase().trim(),
      id: genre.id.toString(),
      page: num.toString(),
      year: selectedYear,
    });
  };

  const handleGenre = (toggleGenre: IGenres) => {
    setGenre(toggleGenre);
    setPage(1);
    setQueryParams({
      genre: toggleGenre.name.toLocaleLowerCase().trim(),
      id: toggleGenre.id.toString(),
      year: selectedYear,
      page: '1',
    });
  };

  const handleSelect = (selectedYear: string) => {
    setSelectedYear(selectedYear);
    setPage(1);
    setQueryParams({
      genre: genre.name.toLocaleLowerCase().trim(),
      id: genre.id.toString(),
      year: selectedYear,
      page: '1',
    });
  };

  useEffect(() => {
    const id = queryParams.get('id') ?? '';
    const genre = queryParams.get('genre') ?? '';

    if (id.length > 0 && genre.length > 0) {
      setGenre({ id: Number(id), name: genre });
    }

    setSelectedYear(queryParams.get('year') ?? '2023');
    setPage(Number(queryParams.get('page') ?? '1'));
  }, [queryParams]);

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data =
          genre.name !== 'All'
            ? await fetchPopular(selectedYear, page, null, genre.id)
            : await fetchPopular(selectedYear, page, null, null);
        setStateData('fulfilled');
        setData(data.results);
        setTotalPage(data.total_pages);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [genre, selectedYear, page]);

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
      {totalPage > 1 && stateData !== 'pending' && (
        <Paginate totalPage={totalPage} page={page} handlePage={handlePage} />
      )}
    </>
  );
};

export default PopularPage;
