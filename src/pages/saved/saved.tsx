import React, { useContext } from 'react';

import { SaveContext } from '../../providers/saveProvider/saveProvider';

import MovieTitle from '../../components/movie/movieTitle';
import SavedItem from './savedItem/savedItem';

const Saved: React.FC = () => {
  const { saved } = useContext(SaveContext);

  return (
    <>
      <MovieTitle title="My Library" />
      <div className="movie__items">
        {saved?.map(item => (
          <SavedItem
            id={item.id}
            img={item.img}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
};

export default Saved;
