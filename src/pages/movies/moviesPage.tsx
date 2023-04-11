import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { fetchTrending } from '../../api/homeAPI';
import { fetchSearch } from '../../api/movieAPI';
import { IPoster } from '../../interfaces/poster.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Paginate from '../../components/paginate/paginate';
import Loader from '../../components/loader/loader';
import Search from '../../components/search/search';
import Movie from '../../components/movie/movie';
import Error from '../../components/error/error';

const MoviesPage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePage = (num: number) => {
    setPage(num);
    setSearchParams({
      query: search.toLocaleLowerCase().trim(),
      page: num.toString(),
    });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
    setSearchParams({
      query: text.toLocaleLowerCase().trim(),
      page: '1',
    });
  };

  useEffect(() => {
    setSearch(searchParams.get('query') ?? '');
    setPage(Number(searchParams.get('page') ?? '1'));
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data =
          search.length > 0
            ? await fetchSearch(search, page)
            : await fetchTrending(page);
        setStateData('fulfilled');
        setData(data.results);
        setTotalPage(data.total_pages);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [search, page]);

  return (
    <>
      <div className="title__head">
        <MovieTitle title="Movie" />
        <Search handleSearch={handleSearch} search={search} />
      </div>
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      {data.length === 0 && stateData !== 'pending' && (
        <div className="error">On request {search} nothing found</div>
      )}
      {data.length > 0 && stateData === 'fulfilled' && <Movie data={data} />}
      {totalPage > 1 && stateData !== 'pending' && (
        <Paginate totalPage={totalPage} page={page} handlePage={handlePage} />
      )}
    </>
  );
};

export default MoviesPage;
