import React, { useEffect, useState } from 'react';

import { fetchPremiere } from '../../../api/homeAPI';
import { IPoster } from '../../../interfaces/poster.interface';

import PremiereItem from './premiereItem/premiereItem';
import ProductsMenu from '../../products/productsMenu/productsMenu';
import Error from '../../error/error';
import Loader from '../../loader/loader';

const Premiere: React.FC = () => {
  const [data, setData] = useState<IPoster[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchPremiere(4);
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, []);
  return (
    <div className="product__right">
      <div className="product__sidebar">
        <div className="product__sidebar__view">
          <ProductsMenu title="Premiere" href="premiere" />
          {stateData === 'rejected' && <Error />}
          {stateData === 'pending' && <Loader />}
          <div className="premiere__gallery">
            {data.map(item => (
              <PremiereItem
                key={item.id}
                title={item.title}
                image={item.poster_path}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premiere;
