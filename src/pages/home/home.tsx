import React from 'react';

import Premiere from '../../components/home/premiere/premiere';
import Trending from '../../components/home/trending/trending';
import Popular from '../../components/home/popular/popular';

const Home: React.FC = () => {
  return (
    <>
      <section className="product">
        <div className="product__wrapper">
          <Trending />
          <Premiere />
        </div>
        <Popular />
      </section>
    </>
  );
};

export default Home;
