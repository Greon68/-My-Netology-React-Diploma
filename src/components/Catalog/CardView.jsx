/*  Компонент отрисовки карточки товарв */

import { Link, NavLink } from "react-router";
import './style.scss'

export const CardView = ({ images, title, price, category, id }) => {
  return (
    <div className="card">
      <img className="card-img-top img-fluid" src={images[0]} alt={title} />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <p className="card-text">Id товара - {id}</p>
        <p className="card-text">Категория - {category}</p>
        {/* При клике по кнопке "Заказать"  переходим в компонент товара Product : */}
        <Link
          to={`/catalog/${id}`}
          className="btn btn-outline-primary button-more "
        >
          Заказать
        </Link>
      </div>
    </div>
  );
};

