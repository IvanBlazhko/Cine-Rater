import React, { useEffect } from 'react';
import HeaderMenuItem from './headerMenuItem/headerMenuItem';

interface IProps {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
}

const HeaderMenu: React.FC<IProps> = ({ isOpen, handleOpen }) => {
  const navItem = [
    { href: '/', text: 'Home' },
    { href: 'movies', text: 'Movie' },
    { href: 'popular', text: 'Popular' },
    { href: 'premiere', text: 'Premiere' },
    { href: 'saved', text: 'Saved' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active');
    }
    if (!isOpen) {
      document.body.classList.remove('active');
    }
  }, [isOpen]);

  return (
    <div className="header__nav">
      <nav className={`header__menu ${isOpen ? 'active' : ''}`}>
        <ul>
          {navItem.map(item => (
            <HeaderMenuItem
              key={item.href}
              href={item.href}
              text={item.text}
              handleOpen={handleOpen}
            />
          ))}
        </ul>
      </nav>
      <button
        onClick={() => handleOpen(!isOpen)}
        className={`header__icon ${isOpen ? 'active' : ''}`}
      >
        <span></span>
      </button>
    </div>
  );
};

export default HeaderMenu;
