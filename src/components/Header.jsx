import React from 'react';
import headerLogo from '../images/logo.svg';

const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
    </header>
  );
};

export default Header;
