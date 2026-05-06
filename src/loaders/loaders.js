import { BASE_URL } from "../config/api";

// Запрос для компонента Catalog ( c query):
export const fetchItemsWithQuery = (category, query, offset) =>
  fetch(
    `${BASE_URL}/api/items?categoryId=${
      category || ""
    }&q=${query}&offset=${offset}`
  ).then((response) => {
    // Проверяем, успешно ли выполнен запрос (статус в диапазоне 200–299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Парсим ответ в формате JSON и возвращаем результат
    return response.json();
  });

// Запрос для компонента HomeCatalog ( без query):
export const fetchItems = (category, offset) =>
  fetch(
    `${BASE_URL}/api/items?categoryId=${category || ""}&offset=${offset}`
  ).then((response) => {
    // Проверяем, успешно ли выполнен запрос (статус в диапазоне 200–299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Парсим ответ в формате JSON и возвращаем результат
    return response.json();
  });
