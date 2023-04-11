import React from 'react';

import { IPoster } from '../../interfaces/poster.interface';

import ProductsItem from './productsItem/productsItem';

interface IProps {
  data: IPoster[];
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
