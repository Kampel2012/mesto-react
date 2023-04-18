import React from 'react';
import header__logo from '../images/logo.svg';

const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" src={header__logo} alt="Логотип" />
    </header>
  );
};

export default Header;
