import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = ({ btnText }) => {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {
        <div className="header__btn">
          <Link className="header__link" to="/sign-up">
            {btnText}
          </Link>
        </div>
      }
    </header>
  );
};

export default Header;
