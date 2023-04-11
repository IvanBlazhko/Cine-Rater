import React from 'react';

import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="notFound">
      <div className="notFound__title">404 - Page not Found 😕</div>
      <div className="notFound__button">
        <Link to="/" className="notFound__btn">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
