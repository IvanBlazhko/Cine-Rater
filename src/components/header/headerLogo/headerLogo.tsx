import React from 'react';

import { Link } from 'react-router-dom';

const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="header__logo">
      Cine<span>Rater</span>
    </Link>
  );
};

export default HeaderLogo;
