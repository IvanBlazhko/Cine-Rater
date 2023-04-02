import React from 'react';

import ProductsItem from './productsItem/productsItem';
import { IPremiere } from '../../interfaces/premiere.interface';

interface IProps {
  data: IPremiere[];
}

const Product: React.FC<IProps> = ({ data }) => {
  return (
    <>
      {data.map(item => (
        <ProductsItem
          key={item.id}
          title={item.title}
          id={item.id}
          view={item.vote_count}
          image={item.poster_path}
          year={item.release_date}
          rating={item.vote_average}
        />
      ))}
    </>
  );
};

export default Product;
