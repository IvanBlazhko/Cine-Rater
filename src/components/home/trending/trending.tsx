import React, { useEffect, useState } from 'react';

import { fetchTrending } from '../../../api/homeAPI';
import { IPoster } from '../../../interfaces/poster.interface';

import ProductsMenu from '../../products/productsMenu/productsMenu';
import Product from '../../products/product';
import Error from '../../error/error';
import Loader from '../../loader/loader';

const Trending: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchTrending(6);
        setData(data);
        setStateData('fulfilled');
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);

  return (
    <div className="product__left">
      <div className="trending__product">
        <ProductsMenu href="movies" title="TRENDING NOW" />
        {stateData === 'rejected' && <Error />}
        {stateData === 'pending' && <Loader />}
        {data.length > 0 && (
          <div className="left__side__items">
            <Product data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
