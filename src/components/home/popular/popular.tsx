import React, { useEffect, useState } from 'react';

import { fetchPopular } from '../../../api/homeAPI';
import { IPremiere } from '../../../interfaces/premiere.interface';

import ProductsMenu from '../../products/productsMenu/productsMenu';
import Product from '../../products/product';
import Error from '../../error/error';
import Loader from '../../loader/loader';

const Popular: React.FC = () => {
  const [data, setData] = useState<IPremiere[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchPopular(8);
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);

  return (
    <div className="popular__product">
      <ProductsMenu href="movies" title="POPULAR IN 2022" />
      {stateData === 'rejected' && <Error />}
      {stateData === 'pending' && <Loader />}
      {data.length > 0 && (
        <div className="movie__items">
          <Product data={data} />
        </div>
      )}
    </div>
  );
};

export default Popular;
