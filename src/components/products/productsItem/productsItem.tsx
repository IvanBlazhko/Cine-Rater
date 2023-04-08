import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import viewImg from '../../../shared/productIMG/view.png';
import { format } from 'date-fns';

interface IProps {
  title: string;
  id: string;
  view: number;
  image: string;
  year: string;
  rating: number;
}

const ProductsItem: React.FC<IProps> = ({
  title,
  year,
  image,
  view,
  id,
  rating,
}) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (year) {
      setDate(format(new Date(year), 'yyyy'));
    }
  }, [year]);

  return (
    <div className="product__item">
      <div className="product__item__pic set-bg">
        <div className="product__item__bg">
          <img
            src={`https://image.tmdb.org/t/p/original${image}`}
            alt="poster"
            className="poster__img"
          />
        </div>
        {rating && <div className="ep">{rating.toFixed(1)}</div>}
        <div className="comment">{date}</div>
        {view && (
          <div className="view">
            <img src={viewImg} alt="total view" />
            {view}
          </div>
        )}
      </div>
      <div className="product__item__text">
        <Link to={`/movie/${id}`}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};

export default ProductsItem;
