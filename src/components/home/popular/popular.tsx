import React, { useEffect, useState } from 'react';

import { fetchPopular } from '../../../api/homeAPI';
import { IPoster } from '../../../interfaces/poster.interface';

import ProductsMenu from '../../products/productsMenu/productsMenu';
import Product from '../../products/product';
import Error from '../../error/error';
import Loader from '../../loader/loader';

const Popular: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchPopular('2023', 1, 8, null);
        setStateData('fulfilled');
        setData(data.results);
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);

  return (
    <div className="popular__product">
      <ProductsMenu href="popular" title="POPULAR IN 2023" />
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
