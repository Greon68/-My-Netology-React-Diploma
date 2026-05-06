/* Изображение для товара */

export const ProductImage = ({product})=> {

    return(
        <>
        {product.images && (
          <img
            src={product.images[0]}
            className="img-product"
            alt={product.title}
          />
        )}
      </>
    )

}