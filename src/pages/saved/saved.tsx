import React, { useContext } from 'react';

import { SaveContext } from '../../providers/saveProvider/saveProvider';
import { Link } from 'react-router-dom';

import MovieTitle from '../../components/movie/movieTitle';
import SavedItem from './savedItem/savedItem';

const Saved: React.FC = () => {
  const { saved } = useContext(SaveContext);

  return (
    <>
      <MovieTitle title="My Library" />
      {saved?.length === 0 && (
        <div className="saved">
          <div className="saved__message">Your movie collection is empty !</div>
          <Link to="/" className="saved__btn">
            Go To Movies
          </Link>
        </div>
      )}
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
