import { useState } from "react";
import { Link, NavLink } from "react-router";
import { CART_ROUT, CATALOG_ROUT } from "../../router/routes";
import { CountOrders } from "./CountOrders";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";
import './style.scss'


export const MainMenuRight = () => {
  // Показ\скрытие поля поиска:
  const [active, setActive] = useState(false);
  // Состояние формы поиска:
  const [form, setForm] = useState({
    searchField: "",
  });

  // Навигация:
  let navigate = useNavigate()

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSearchClick = ()=> {
    // console.log("Клик по лупе")
    setActive(prev =>!prev);
    if(active && form.searchField){
      console.log("form -", form)
      navigate(
        CATALOG_ROUT,
        {state:{valueSearch :form.searchField }}
      );
      setForm({
        searchField: "",
      })
    }
  }

  return (
    /* Контейнер  правой части главного меню */
    <div className="main-menu-right">
      <div className="header-controls-pics">
        {/* ЛУПА: useNavigate() */}
        <div
          // data-id="search-expander"
          className="header-controls-pic header-controls-search"
          onClick={onSearchClick}
        ></div>

        {/* КОРЗИНА */}
        <Link
          className="header-controls-pic header-controls-cart"
          to={CART_ROUT}
          // onClick={() => console.log("Клик по корзине")}
          // state={{data:"Привет, корзина !!!"}}
        >
          <CountOrders />
        </Link>
      </div>
      {/* ПОЛЕ ПОИСКА - Форма */}
      <form
        // data-id="search-form"
        // className="header-controls-search-form form-inline invisible"
        className="header-controls-search-form form-inline "
      >
        <input
          // type="search"
          className={active ? "form-control" : "form-control invisible"}
          id="search-field"
          name="searchField"
          value={form.searchField}
          onChange={onFormChange}
          placeholder="Поиск"
        />
      </form>
    </div>
  );
};
