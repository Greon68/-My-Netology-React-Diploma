import { Link, NavLink } from "react-router";
import { ABOUTE_ROUT, CATALOG_ROUT, CONTACTS_ROUT } from "../../router/routes";
import './style.scss'

export const MainMenuLeft = () => {
  return (
    <div className="main-menu-left">
      <Link className="main-menu-item" to={"/"}>
        {<img src="../../../img/header-logo.png" />}
      </Link>
      <Link className="main-menu-item" to={"/"}>
        Главная
      </Link>
      <NavLink to={CATALOG_ROUT} className="main-menu-item">
        Каталог
      </NavLink>
      <NavLink to={ABOUTE_ROUT} className="main-menu-item">
        О магазине
      </NavLink>
      <NavLink className="main-menu-item" to={CONTACTS_ROUT}>
        Контакты
      </NavLink>
      <h3>My-Diploma-React</h3>
    </div>
  );
};
