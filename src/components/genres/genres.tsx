import React, { useState, useEffect } from 'react';

import { fetchGenres } from '../../api/movieAPI';
import { IGenres } from '../../interfaces/genres.interface';
import { toast } from 'react-toastify';

import GenresItem from './genresItem/genresItem';

interface IProps {
  handleGenre: (toggleGenre: IGenres) => void;
  genre: IGenres;
}

const Genres: React.FC<IProps> = ({ handleGenre, genre }) => {
  const [data, setData] = useState<IGenres[]>([{ id: 0, name: 'All' }]);
  const [stateData, setStateData] = useState('pending');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchGenres();
        setStateData('fulfilled');
        setData(prevState => [...prevState, ...data]);
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);

  useEffect(() => {
    if (stateData === 'rejected')
      toast.error('Unfortunately we were unable to get the list of genres.', {
        theme: 'colored',
      });
  }, [stateData]);

  return (
    <div className="genres">
      <div className="genres__body">
        {data.map(item => (
          <GenresItem
            genre={genre}
            handleGenre={handleGenre}
            id={item.id}
            name={item.name}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Genres;
