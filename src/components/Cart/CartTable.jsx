import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./style.scss";

export const CartTable = (props) => {
  console.log("Cart table props-", props);
  const { orders, onDeleteOrder } = props;

  // Общая цена товаров в корзине:
  const [totalPrice, setTotalPrice] = useState(
    orders.reduce((resultPrice, order) => resultPrice + order.priceTotal, 0)
  );
  // Общее количество товаров в корзине:
  const [countProducts, setCountProducts] = useState(
    orders.reduce((resultCount, order) => resultCount + order.count, 0)
  );

  // Перерисовываем таблицу при изменении количества товаров в корзине:
  useEffect(() => {
    setTotalPrice(
      orders.reduce((resultPrice, order) => resultPrice + order.priceTotal, 0)
    );
    setCountProducts(
      orders.reduce((resultCount, order) => resultCount + order.count, 0)
    );
  }, [orders]);

  return (
    <>
      {orders.length > 0 && (
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость 1 ед.</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderId}>
                <td scope="row">{index + 1}</td>
                <td>
                  <Link to={`/catalog/${order.id}`}>{order.title}</Link>
                </td>
                <td>{order.size}</td>
                <td>{order.count}</td>
                <td>{order.price}</td>
                <td>{order.priceTotal}</td>
                <td>
                  <button
                    onClick={() => onDeleteOrder(order.orderId)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-right">
                Общее количество
              </td>
              <td>{countProducts} ед.</td>
            </tr>
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>{totalPrice} руб.</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
