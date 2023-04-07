import React from 'react';

import { IGenres } from '../../../interfaces/genres.interface';

interface IProps {
  handleGenre: (toggleGenre: IGenres) => void;
  genre: IGenres;
  name: string;
  id: number;
}

const GenresItem: React.FC<IProps> = ({ handleGenre, genre, name, id }) => {
  return (
    <div
      className={`genres__item ${genre.name === name ? 'active' : ''}`}
      onClick={() => handleGenre({ id, name })}
    >
      {name}
    </div>
  );
};

export default GenresItem;
