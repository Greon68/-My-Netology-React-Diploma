
export const CatalogMenu = (props) => {
  // console.log('CatalogMenu props -', props);
  const { categories, selected, onSelectFilter } = props;

  //2. Добавляем категорию "Все" в массив категорий
  if (categories && categories.length === 4) {
    categories.unshift({ id: 0, title: "Все" });
  }

  // По клику по одноой из кнопокк фиксируем выбранную категорию
  // и загружаем данные для этой категории:
  const handleClick = (item) => {
    // item - объект выбранной кнопки ( напр.: { id:12 , title:"Женская обувь"})
    onSelectFilter(item);
  };

  // console.log('CatalogMenu categories -', categories);
  return (
    <ul className="home-catalog-menu">
      {categories &&
        categories.map((elem) => (
          <li
            key={elem.id}
            className={
              elem.title === selected.title
                ? "active  menu-button "
                : " menu-button"
            }
            onClick={() => handleClick(elem)}
          >
            {elem.title}
          </li>
        ))}
    </ul>
  );
};
