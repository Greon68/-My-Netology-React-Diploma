/*  КОМПОНЕНТ ФОРМЫ В КОРЗИНЕ ТОВАРОВ  */

import { useState } from "react";
import { LoadSuccess } from "./LoadSuccess";

export const CartForm = (props) => {
  console.log("CartForm props -", props);

  const { orders, clearLocalStorage, successLoadOrder, hideMessage } = props;

  console.log("CartForm orders - ", orders);
  console.log("CartForm orders.length - ", orders.length);

  // Состояние для формы:
  const [form, setForm] = useState({
    phone: "",
    address: "",
    policy: false,
  });

  // Деструктурируем поля формы:
  const { phone, address, policy } = form;
  // Форма загружена не полностью :
  const [errorForm, setErrorForm] = useState(false);

  // Формируем  массив данных для POST-запроса :
  // Создаём пустой массив:
  const ordersPost = [];
  // Заполняем массив объектами данных о заказах из корзины:
  orders.map((order) =>
    ordersPost.push({
      id: order.orderId,
      price: order.price,
      count: order.count,
    })
  );
  console.log("CartForm ordersPost-", ordersPost);

  //Функция загрузки данных на сервер:

  const loaderOrders = async (orderObject) => {
    try {
      const response = await fetch("http://localhost:7070/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderObject),
      });
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      successLoadOrder();
      console.log("Данные отправлены на сервер");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Обработчик отправки формы:

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;

    // Если все поля формы заполнены ...
    if (phone && address && policy) {
      const formData = new FormData(target);
      const data = Object.fromEntries(formData);
      // формируем объект формы для отправки в POST-запросе
      const dataPost = {
        phone: data.phone,
        address: data.address,
      };
      // Формируем тело для POST-запроса
      const postBody = {
        // Объект формы:
        owner: dataPost,
        // Массив объектов заказов:
        item: ordersPost,
      };

      // Производим POST-запрос на сервер:
      loaderOrders(postBody);

      //   Обнуляем поля формы :
      setForm({
        phone: "",
        address: "",
        policy: false,
      });
      // Удаляем содержимое из LocalStorage:
      clearLocalStorage();
      // Если форма не заполнена полностью:
    } else {
      setErrorForm(true);
      // console.log("Ошибка в заполнении формы");
    }
  };

  // Обработчики onChange полей формы:
  const handleChange = (e) => {
    // Удаляем сообщение о необходимости заполнения всех полей формы:
    setErrorForm(false);
    // Удаляем сообщение об успешной загрузки заказа на сервер:
    hideMessage();
    const { name, value, type, checked } = e.target;
    // console.log("value :", value);
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        {/* <div className="card" style="max-width: 30rem; margin: 0 auto;"> */}
        <div
          className="card card-form"
          style={{ maxWidth: "130rem", margin: " 0 auto" }}
        >
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон : </label>
              <input
                className="form-control"
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={phone}
                placeholder="Ваш телефон"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки : </label>
              <input
                className="form-control"
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleChange}
                placeholder="Адрес доставки"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                name="policy"
                checked={policy}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary btn-form"
            >
              Оформить
            </button>
          </form>
          {errorForm && <h3> Введите полные данные </h3>}
        </div>
        {/* {successMessage  && <LoadSuccess/> } */}
      </section>
    </>
  );
};
