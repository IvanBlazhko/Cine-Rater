import React from 'react';
import { useParams } from 'react-router-dom';

import MovieTitle from '../../components/movie/movieTitle';

const Trailer: React.FC = () => {
  const { imdb_id, id, title } = useParams();

  console.log(imdb_id, id, title);

  return (
    <>
      <MovieTitle title={title ? title : ''} />
    </>
  );
};

export default Trailer;
