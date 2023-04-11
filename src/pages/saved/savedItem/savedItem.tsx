import React from 'react';

import { Link } from 'react-router-dom';

import { ISaveItem } from '../../../interfaces/saveItem.interface';

const SavedItem: React.FC<ISaveItem> = ({ title, img, id }) => {
  return (
    <div className="product__item">
      <div className="product__item__pic set-bg">
        <div className="product__item__bg">
          <img
            src={`https://image.tmdb.org/t/p/original/${img}`}
            alt="poster"
            className="poster__img"
          />
        </div>
      </div>
      <div className="product__item__text">
        <Link to={`/movie/${id}`}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};

export default SavedItem;
