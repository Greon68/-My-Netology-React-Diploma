/* Компонент продукта  */
import "./style.scss";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { BASE_URL } from "../../config/api";
import { SizesListPreview } from "./SizesListPreview";
import { ProductInfo } from "./ProductInfo";
import { ProductImage } from "./ProductImage";
import { useParams, useNavigate } from "react-router";
import { CART_ROUT } from "../../router/routes";
import { Loader } from "../Loader/Loader";

export const Product = () => {
  const { id } = useParams();

  // Объект товара:
  const [product, setProduct] = useState({});
  // Счётчик количества заказываемого товара:
  const [count, setCount] = useState(1);
  // Есть ли в наличии размеры для текущего товара:
  const [sizesAvailable, setSizesAvailable] = useState(true);
  // Массив размеров товара в наличии:
  const [sizeList, setSizeList] = useState([]);
  // Выбранный размер:
  const [selectedSize, setSelectedSize] = useState("");
  // Подключаем навигацию:
  const navigate = useNavigate();
  // Подключаемся к локальному хранилищу браузера.
  // Состояние для массива объектов заказов:
  const [orders, setOrders] = useLocalStorage("orders", []);
  // Отслеживание загрузки/ошибки :
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [errorProduct, setErrorProduct] = useState("");

  // Функция загрузки данных о текущем товаре по сети:
  const getProduct = async () => {
    setLoadingProduct(true);
    setErrorProduct("");
    try {
      const resp = await fetch(`${BASE_URL}/api/items/${id}`);

      const data = await resp.json();

      if (resp.status > 399) {
        throw data;
      }

      setProduct(data);
      // console.log("Объект товара data -", data);

      // Проверка на наличие хотя бы одного размера для данного товара:
      const available = data.sizes.some((item) => item.available === true);
      setSizesAvailable(available);

      // Если размеры для данного товара есть в наличии , то :
      if (available) {
        // Берём массив доступных размеров
        data.sizes.map((item) => {
          // выбираем те, что имеются в наличии (available = true):
          if (item.available) {
            // Заполняем список размеров товара значениями :
            // sizeListWorking.push(item.size);
            setSizeList((prev) => [...prev, item.size]);
          }
        });
      }
    } catch (error) {
       setErrorProduct(error.message);
    } finally {
       setLoadingProduct(false);
    }
  };

 
  // Загружаем данные о текущем товаре при загрузке страницы:
  useEffect(() => {
    getProduct();
  }, []);

  // Функция добавления заказа в LocalStorage:
  const addToOrderInLocalStorage = () => {
    // Фиксируем пару "товар-размер" для текущего заказа:
    const orderId = product.id + " : " + selectedSize;
    // console.log('orderId-',orderId , 'typeOf orderId- ', typeof orderId );

    // Определяем полную стоимость для текущего заказа:
    const priceTotal = product.price * count;

    // Определяем , есть ли в хранилище заказ для данной пары:
    const result = orders.find((order) => order.orderId === orderId);
    console.log("result -", result);

    // Если уже есть , то повторно заказ не сохраняем в хранилище
    if (result) {
      return;
    }
    // Иначе, сохраняем объект заказа в localStorage и в переменной orders
    else {
      setOrders([
        ...orders,
        {
          orderId: orderId,
          id: product.id,
          title: product.title,
          price: product.price,
          size: selectedSize,
          count: count,
          priceTotal: priceTotal,
        },
      ]);
    }
  };

  //   Счётчики количества товара:
  // +1 :
  const add = () => {
    setCount((prev) => prev + 1);
    if (count >= 10) {
      setCount(10);
    }
  };
  // -1 :
  const dec = () => {
    setCount((prev) => prev - 1);
    if (count <= 1) {
      setCount(1);
    }
  };

  // Сохраняем выбранный размер товара:
  const onSelectedSize = (size) => {
    setSelectedSize(size);
  };

  /* Клик по кнопке "Заказать"- устанавливаем ordreActiv в true;
    сохраняем объект заказа в localStorage,
    переходим в корзину:
  */
  const onOrder = () => {
    addToOrderInLocalStorage();
    navigate(CART_ROUT);
  };

  console.log(
    "Имеются ли в наличии размеры для данного товара (sizesAvailable) -",
    sizesAvailable
  );
  console.log("Загружен продукт (product) -", product);
  console.log("Список доступных размеров (sizeList) -", sizeList);
  console.log("Выбран размер (selectedSize) - ", selectedSize);
  console.log("LocalStorage orders - ", orders);

  return (
    <>
      {/* Индикатор загрузки данных товара */}
      {loadingProduct && (
        <div className="loading text-center">
          <h3> Загрузка данных товара ...</h3>
          <Loader />
        </div>
      )}
      {/* Вывод информации об ошибке загрузки данных товара */}
      {errorProduct && (
        <div className="text-center">
          <h3> Ошибка загрузки данных товара ...</h3>
        </div>
      )}

      {product && (
        <section className="catalog-item">
          <h2 className="text-center">{product.title}</h2>
          <div className="row product-container">
            <div className="col-5">
              <ProductImage product={product} />
            </div>

            <div className="col-7">
              <ProductInfo product={product} />

              {/* Если нет ни одного размера в наличии: */}
              {!sizesAvailable && (
                <h3 className="text-center">Товара нет в наличии</h3>
              )}

              {/* Если есть размеры в наличии ... */}
              {/* Список имеющихся в наличии размеров */}
              {sizesAvailable && (
                <>
                  <SizesListPreview
                    sizeList={sizeList}
                    onSelectedSize={onSelectedSize}
                    selectedSize={selectedSize}
                  />
                  {/* Блок "Количество" */}
                  <div className="text-center product-info">
                    Количество :
                    <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={dec}>
                        -
                      </button>
                      <span className="btn btn-outline-primary">{count}</span>
                      <button className="btn btn-secondary" onClick={add}>
                        +
                      </button>
                    </span>
                  </div>

                  {/* Кнопка "Заказать" */}
                  <div className="text-center btn-my">
                    {selectedSize && (
                      <div className="button-block">
                        <button onClick={onOrder} className="btn">
                          Заказать
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

