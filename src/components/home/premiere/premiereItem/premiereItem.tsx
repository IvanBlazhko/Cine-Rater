import React from 'react';

import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  image: string;
  id: string;
}

const PremiereItem: React.FC<IProps> = ({ title, image, id }) => {
  return (
    <div className="product__sidebar__view__item set-bg">
      <div className="product__item__bg right__item">
        <img
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt="poster"
          className="poster__gallery"
        />
      </div>
      <h5>
        <Link to={`/movie/${id}`}>
          <p>{title}</p>
        </Link>
      </h5>
    </div>
  );
};

export default PremiereItem;
