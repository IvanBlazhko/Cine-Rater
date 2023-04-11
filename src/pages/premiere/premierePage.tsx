import React, { useEffect, useState } from 'react';

import { fetchPremiere } from '../../api/homeAPI';
import { useSearchParams } from 'react-router-dom';
import { IGenres } from '../../interfaces/genres.interface';
import { IPoster } from '../../interfaces/poster.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Paginate from '../../components/paginate/paginate';
import Loader from '../../components/loader/loader';
import Genres from '../../components/genres/genres';
import Error from '../../components/error/error';
import Movie from '../../components/movie/movie';

const PremierePage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [genre, setGenre] = useState<IGenres>({ id: 0, name: 'All' });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenre = (toggleGenre: IGenres) => {
    setGenre(toggleGenre);
    setPage(1);
    setSearchParams({
      genre: toggleGenre.name.toLocaleLowerCase().trim(),
      id: toggleGenre.id.toString(),
      page: '1',
    });
  };

  const handlePage = (num: number) => {
    setPage(num);
    setSearchParams({
      genre: genre.name.toLocaleLowerCase().trim(),
      id: genre.id.toString(),
      page: num.toString(),
    });
  };

  useEffect(() => {
    const id = searchParams.get('id') ?? '';
    const genre = searchParams.get('genre') ?? '';

    if (id.length > 0 && genre.length > 0) {
      setGenre({ id: Number(id), name: genre });
    }
    setPage(Number(searchParams.get('page') ?? '1'));
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data =
          genre.name !== 'All'
            ? await fetchPremiere(page, null, genre.id)
            : await fetchPremiere(page);
        setStateData('fulfilled');
        setData(data.results);
        setTotalPage(data.total_pages);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [genre, page]);

  return (
    <>
      <MovieTitle title="Premiere" />
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

export default PremierePage;
