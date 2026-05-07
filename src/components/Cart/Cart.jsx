/* Корзина товаров */
import "./style.scss";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { CartTable } from "./CartTable";
import { CartForm } from "./CartForm";
import { LoadSuccess } from "./LoadSuccess";

export const Cart = () => {
  // Достаём из localStorage массив заказов orders:
  const [orders, setOrders] = useLocalStorage("orders", []);

  // Запуск сообщения об успешно загруженных на сервер данных:
  const [successMessage, setSuccessMessage] = useState(false);

  // Удаляем заказ из таблицы:
  const onDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((elem) => elem.orderId !== id));
  };

  // Функция очистки LocalStorage:
  const clearLocalStorage = () => {
    localStorage.clear();
    // обнуляем список заказов:
    setOrders([]);
  };

  // Функция показа сообщения об успешном оформлении заказа на сервере :
  const successLoadOrder = () => {
    setSuccessMessage(true);
  };

  // Функция скрытия сообщения об успешном оформлении заказа на сервере :
  const hideMessage = () => {
    setSuccessMessage(false);
  };

  console.log("Cart orders-", orders);

  return (
    <>
      <section className="cart text-center">
        <h2 className="text-center">Корзина</h2>
        {orders.length < 1 && (
          <h3 className="non-orders text-center"> В корзине нет товаров </h3>
        )}
        {orders.length >= 1 && (
          <>
            <CartTable orders={orders} onDeleteOrder={onDeleteOrder} />
            <CartForm
              orders={orders}
              clearLocalStorage={clearLocalStorage}
              successLoadOrder={successLoadOrder}
              hideMessage={hideMessage}
            />
          </>
        )}
        {/* При успешной отправки заказа на сервер показываем сообщение  */}
        {successMessage && <LoadSuccess />}
      </section>
    </>
  );
};
