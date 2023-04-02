import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

interface IProps {
  href: string;
  text: string;
  handleOpen: (open: boolean) => void;
}

const ItemLink = styled(NavLink)`
  &.active {
    color: #e63334ff;
    &:hover {
      color: #e63334ff;
    }
  }
  &:hover {
    color: #ffff;
  }
`;

const HeaderMenuItem: React.FC<IProps> = ({ href, text, handleOpen }) => {
  return (
    <li className="menu__link">
      <ItemLink to={href} onClick={() => handleOpen(false)}>
        {text}
      </ItemLink>
    </li>
  );
};

export default HeaderMenuItem;
