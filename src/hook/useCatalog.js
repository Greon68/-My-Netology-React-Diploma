import { useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

export function useCatalog(categoryId = "", searchQuery = "", limit = 6) {
  // Массив объектов товаров:
  const [items, setItems] = useState([]);
  // Значение offset:
  const [offset, setOffset] = useState(0);
  // Флаг , есть ли ещё данные для загрузки:
  const [hasMore, setHasMore] = useState(true);
  // Флаг запуcка индикатора загрузки:
  const [loading, setLoading] = useState(false);

  // Сброс при изменении категории или поиска
  useEffect(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
  }, [categoryId, searchQuery]);

  // Загрузка при изменении offset
  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch(
      `${BASE_URL}/api/items?categoryId=${
        categoryId || ""
      }&q=${searchQuery}&offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [...prev, ...data]);
        setHasMore(data.length === limit);
      })
      .finally(() => setLoading(false));
  }, [offset, categoryId, searchQuery, limit]); // зависимости

  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + limit);
    }
  };
//   const loadMore = () => {    
//       setOffset((prev) => prev + limit);   
//   };


  console.log("loadMore offset - ", offset);

  return { items, loading, hasMore, loadMore };
}
