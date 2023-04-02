import React from 'react';

interface IProps {
  title: string;
}

const MovieTitle: React.FC<IProps> = ({ title }) => {
  return (
    <div className="product__menu">
      <div className="product__title page__title">
        <div className="section-title product__title">
          <h4>{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
