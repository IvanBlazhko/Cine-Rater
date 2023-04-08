import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IPoster } from '../../interfaces/poster.interface';
import { fetchTrending } from '../../api/homeAPI';
import { fetchSearch } from '../../api/movieAPI';

import Movie from '../../components/movie/movie';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import MovieTitle from '../../components/movie/movieTitle';
import Search from '../../components/search/search';

const MoviesPage: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const handleSearch = (text: string) => {
    setSearch(text);
    setSearchParams({
      query: text.toLocaleLowerCase().trim(),
    });
  };

  useEffect(() => {
    setSearch(searchParams.get('query') ?? '');
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data =
          search.length > 0 ? await fetchSearch(search) : await fetchTrending();
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [search]);

  return (
    <>
      <div className="title__head">
        <MovieTitle title="Movie" />
        <Search handleSearch={handleSearch} search={search} />
      </div>
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      <Movie data={data} />
    </>
  );
};

export default MoviesPage;
