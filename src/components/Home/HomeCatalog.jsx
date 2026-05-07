
// import { useLocation } from "react-router";
// // import { useCatalog } from "../../hook/useCatalog";
// import { useGetFetch } from "../../hook/useGetFetch";
// import { CatalogMenu } from "./CatalogMenu";
// import { CatalogPreview } from "./CatalogPreview";
// import { BASE_URL } from "../../config/api";

// import { fetchItemsWithQuery } from "../../loaders/loaders";

import { useEffect, useState } from "react";
import { useGetFetch } from "../../hook/useGetFetch";
import { CatalogMenu } from "../Catalog/CatalogMenu";
import { CatalogPreview } from "../Catalog/CatalogPreview";
import { BASE_URL } from "../../config/api";
import { fetchItems } from "../../loaders/loaders";
import "./style.scss";
import { Loader } from "../Loader/Loader";

export const HomeCatalog = () => {
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
    // Лимит на количество загружаемых за один запрос элементов:
    const[limit]= useState(6);
    // Ошибка при загрузке данных о товарах
    const[error, setError]= useState('');
    
    useEffect(() => {
      // При смене категории или поиска сбрасываем список и offset
      setItems([]);
      setOffset(0);
      setHasMore(true);
    }, [categoryId]);
  
  //  Загрузка  данных при смене offset
    useEffect(() => {
      if (loading) return;
      setLoading(true);
      fetchItems(categoryId, offset)
        .then((data) => {
          setItems((prev) => [...prev, ...data]);
          setHasMore(data.length === limit);     
        })
        .catch(error =>setError(error.message))
        .finally(() => setLoading(false));
  
    }, [offset, categoryId]);
  
  
   // Обработчик клика на кнопку "Загрузить ещё".
   // Увеличиваем offset на значение limit:
    const loadMore = () => {
      if (!loading && hasMore) {
        setOffset((prev) => prev + limit);
      }
    };
  
    // Клик по кнопкам меню в категориях товаров
    const onSelectFilter = (item) => {
      console.log("onSelectFilter item -", item);
      //  Фиксируем выбранный объект категории в константу selected:
      setSelected(item); 
     // Вытаскиваем из выбранного объекта поле id и записываем в categoryId 
      setCategoryId(item.id);    
      // Обнуляем offset: 
      setOffset(0)
 
    };
    
    console.log("************************************");
    console.log("offset-", offset);
    console.log("selected-", selected);
    console.log("categoryId-", categoryId, );
    console.log("items -", items);
  
    return (
      <>  
        {/* Индикатор загрузки списка категорий */}
        {loadingCategories && (
            <div className="loading text-center">
              <h3> Загрузка списка категорий...</h3>
               <Loader/>
            </div>
        )}
        {/* Вывод информации об ошибке загрузки списка категорий */}
        {errorCategories && (
                <div className="text-center">
                  <h3>  Ошибка загрузки списка категорий...</h3>              
                </div>
        )}
        {/* Индикатор загрузки списка товаров */}
        {loading && (
               <div className="loading text-center">
                  <h3> Загрузка списка товаров...</h3>
                  <Loader/>
             </div>
        )}
        {/* Вывод информации об ошибке загрузки списка товаров */}
        {error && (
                <div className="text-center">
                  <h3>  Ошибка загрузки списка товаров...</h3>              
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
  
      </>
    );
  };
  