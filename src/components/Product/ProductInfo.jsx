/* Прорисовываем таблицу с информацией о товаре */

export const ProductInfo =({product})=> {
    
    return (
        <table className="table table-bordered">
        <tbody>
          <tr>
            <td>ID </td>
            <td> {product.id}</td>
          </tr>
          <tr>
            <td>Артикул </td>
            <td> {product.sku}</td>
          </tr>
          <tr>
            <td>Производитель </td>
            <td> {product.manufacturer}</td>
          </tr>
          <tr>
            <td>Цвет </td>
            <td>{product.color}</td>
          </tr>
          <tr>
            <td>Материалы </td>
            <td> {product.material}</td>
          </tr>
          <tr>
            <td>Сезон </td>
            <td> {product.season}</td>
          </tr>
          <tr>
            <td>Повод</td>
            <td>{product.reason}</td>
          </tr>
          <tr>
            <td>Цена </td>
            <td> {product.price}</td>
          </tr>
        </tbody>
      </table>
    )
}