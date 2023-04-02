import React from 'react';

import { IPoster } from '../../interfaces/poster.interface';

import Product from '../products/product';

interface IProps {
  data: IPoster[];
}

const Movie: React.FC<IProps> = ({ data }) => {
  return (
    <>
      <div className="movie__items">
        <Product data={data} />
      </div>
    </>
  );
};

export default Movie;
