/*  Компонент отрисовки карточки товарв */

import { Link, NavLink } from "react-router";
import { PRODUCT_ROUT } from "../../router/routes";
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

{
  /* <div class="card">
                  <img src="./img/products/sandals_myer.jpg"
                    class="card-img-top img-fluid" alt="Босоножки 'MYER'">
                  <div class="card-body">
                    <p class="card-text">Босоножки 'MYER'</p>
                    <p class="card-text">34 000 руб.</p>
                    <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
                  </div>
</div> */
}
