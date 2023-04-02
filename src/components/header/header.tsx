import React, { useState } from 'react';

import HeaderLogo from './headerLogo/headerLogo';
import HeaderMenu from './headerMenu/headerMenu';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          <HeaderMenu handleOpen={handleOpen} isOpen={isOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
