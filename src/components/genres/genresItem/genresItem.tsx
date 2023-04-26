import React from 'react';

import { IGenres } from '../../../interfaces/genres.interface';

interface IProps {
  handleGenre: (toggleGenre: IGenres) => void;
  genre: IGenres;
  name: string;
  id: number;
}

const GenresItem: React.FC<IProps> = ({ handleGenre, genre, name, id }) => {
  const setGenre = () => {
    if (genre.name.toLowerCase() !== name.toLowerCase()) {
      handleGenre({ id, name });
    }
  };

  return (
    <div
      className={`genres__item ${
        genre.name.toLowerCase() === name.toLowerCase() ? 'active' : ''
      }`}
      onClick={() => setGenre()}
    >
      {name}
    </div>
  );
};

export default GenresItem;
