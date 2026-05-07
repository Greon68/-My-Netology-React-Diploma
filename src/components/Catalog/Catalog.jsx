/* БАЗОВЫЙ КОМПОНЕНТ ДЛЯ РАБОТЫ С КАТАЛОГОМ ТОВАРОВ */

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
// import { useCatalog } from "../../hook/useCatalog";
import { useGetFetch } from "../../hook/useGetFetch";
import { CatalogMenu } from "./CatalogMenu";
import { CatalogPreview } from "./CatalogPreview";
import { BASE_URL } from "../../config/api";
// Функция загрузки данных через fetch-запрос:
import { fetchItemsWithQuery } from "../../loaders/loaders";
import { Loader } from "../Loader/Loader";
import "./style.scss";

export const Catalog = () => {
  // Загружаем список категорий:
  const [categories, loadingCategories, errorCategories] =
    useGetFetch("/api/categories");

  // Id dыбранной  категории:
  const [categoryId, setCategoryId] = useState(0);
  // Выбранная категория товаров (объект):
  const [selected, setSelected] = useState({ id: 0, title: "Все" });
  // Список товаров:
  const [items, setItems] = useState([]);
  // Текущий offset:
  const [offset, setOffset] = useState(0);
  // Флаг для показа кнопки "Загрузить ещё":
  const [hasMore, setHasMore] = useState(true);
  //  Индикатор загрузки данных о товарах:
  const [loading, setLoading] = useState(false);
  // Поисковая фраза:
  const [searchQuery, setSearchQuery] = useState("");
  // Данные в поле поиска формы
  const [search, setSearch] = useState({
    title: "",
  });
  // Флаг : "В выбранной категории НЕТ НУЖНОГО ТОВАРА"  ???:
  const [productNotAvailable, setProductNotAvailable] = useState(false);
  // Лимит на количество загружаемых за один запрос элементов:
  const [limit] = useState(6);
  // Ошибка при загрузке данных о товарах
  const [error, setError] = useState("");

  // Объект location из  useLocation()
  let location = useLocation();
  console.log("Catalog location - ", location);

  // Если получены данные из поля поиска главного меню,
  // запишем их в search.title:
  useEffect(() => {
    // console.log("SearchCatalog location.state - ", location.state);
    if (location.state?.valueSearch) {
      setSearch({ title: location.state.valueSearch });
    }
  }, [location]);

  useEffect(() => {
    // При смене категории или поиска сбрасываем список и offset
    setItems([]);
    setOffset(0);
    setHasMore(true);
    setProductNotAvailable(false);
  }, [categoryId, searchQuery]);

  //  Загрузка  данных при смене offset
  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetchItemsWithQuery(categoryId, searchQuery, offset)
      .then((data) => {
        setItems((prev) => [...prev, ...data]);
        setHasMore(data.length === limit);
        // Если при первой загрузки не находим ни одного товара из поля поиска ,
        // выводим информационное сообщение об этом:
        setProductNotAvailable(offset === 0 && data.length === 0);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [offset, categoryId, searchQuery]);

  // Обработчик клика на кнопку "Загрузить ещё".
  // Увеличиваем offset на значение limit:
  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + limit);
    }
  };

  // oбработчик onChange для поля поиска формы:
  const onSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик события Submit на форме поиска.
  // При клике передаём значение из поля поиска формы в переменную
  // поиска по фразе searchQuery:
  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search.title);
  };

  // Клик по кнопкам меню в категориях товаров
  const onSelectFilter = (item) => {
    console.log("onSelectFilter item -", item);
    //  Фиксируем выбранный объект категории в константу selected:
    setSelected(item);
    // Вытаскиваем из выбранного объекта поле id и записываем в categoryId
    setCategoryId(item.id);
    // Обнуляем поисковую фразу:
    setSearchQuery("");

    // Обнуляем поле поиска:
    // setSearch({ title: "" });

    // Обнуляем offset:
    setOffset(0);
    // Выставляем в false флаг productNotAvailable :
    setProductNotAvailable(false);
  };

  console.log("************************************");
  console.log("searchQuery -", searchQuery);
  console.log("offset-", offset);
  console.log("selected-", selected);
  console.log("categoryId-", categoryId);
  console.log("items -", items);

  return (
    <>
      <div className="catalog">
        <h2 className="text-center title-block">Каталог</h2>
        <form className="catalog-search-form" onSubmit={onSearchSubmit}>
          <input
            type="search"
            className="form-control"
            name="title"
            value={search.title}
            onChange={onSearchChange}
            placeholder="Поиск"
          />
          {search.title && (
            <button type="submit" className="button-catalog-search-form">
              Найти
            </button>
          )}
        </form>

        {/* Индикатор загрузки списка категорий */}
        {loadingCategories && (
          <div className="loading text-center">
            <h3> Загрузка списка категорий...</h3>
            <Loader />
          </div>
        )}
        {/* Вывод информации об ошибке загрузки списка категорий */}
        {errorCategories && (
          <div className="text-center">
            <h3> Ошибка загрузки списка категорий...</h3>
          </div>
        )}
        {/* Индикатор загрузки списка товаров */}
        {loading && (
          <div className="loading text-center">
            <h3> Загрузка списка товаров...</h3>
            <Loader />
          </div>
        )}
        {/* Вывод информации об ошибке загрузки списка товаров */}
        {error && (
          <div className="text-center">
            <h3> Ошибка загрузки списка товаров...</h3>
          </div>
        )}

        <CatalogMenu
          categories={categories}
          selected={selected}
          onSelectFilter={onSelectFilter}
        />

        <CatalogPreview previewList={items} />

        {hasMore && (
          <div className="text-center">
            <button className="button-more" onClick={loadMore}>
              Загрузить ещё
            </button>
          </div>
        )}

        {productNotAvailable && (
          <div className="text-center">
            <h3>Искомого товара нет в данной категории</h3>
          </div>
        )}
      </div>
    </>
  );
};
