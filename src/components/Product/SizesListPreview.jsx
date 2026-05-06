/* 
    РАБОТАЕМ С МАССИВОМ РАЗМЕРОВ ТЕКУЩЕГО ТОВАРА
*/

export const SizesListPreview = (props) => {
  console.log("SizesListPreview props-", props);

  const { sizeList, onSelectedSize, selectedSize } = props;

  return (
    <>
      <p>Для заказа товара выберите нужный размер</p>

      <div className="text-center product-info">
        Размеры в наличии :
        {sizeList.map((item) => (
          <span
            key={item}
            className={
              item === selectedSize
                ? "catalog-item-size selected"
                : "catalog-item-size"
            }
            onClick={() => onSelectedSize(item)}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
};
