import React from 'react';

import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  href: string;
}

const ProductsMenu: React.FC<IProps> = ({ title, href }) => {
  return (
    <div className="product__menu">
      <div className="product__title">
        <div className="section-title product__title">
          <h4>{title}</h4>
        </div>
      </div>
      <div className="btn__all">
        <Link to={href} className="primary-btn">
          View All <span className="arrow_right">&#8594;</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsMenu;
